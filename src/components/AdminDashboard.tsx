
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Trash2, Users, MessageSquare, Shield, AlertTriangle, ArrowRight, User, Mail, Phone, Calendar, Clock, Edit2, Save, Plus, Database, List, Lock, Settings, LogOut, CheckCircle2 } from 'lucide-react';
import { LeadData, ChatLog, LeadStatus, NewsletterSubscriber } from '../types';
import { Button } from './Button';
import { supabase } from '../supabaseClient';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

// SECURITY: Only these emails can access the dashboard
const ALLOWED_EMAILS = ["luc.rabe@widea.center"];

const COLUMNS: { id: LeadStatus; label: string; color: string }[] = [
  { id: 'new', label: 'Nouveau', color: 'bg-blue-100 text-blue-800' },
  { id: 'contacted', label: 'Contacté', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'meeting', label: 'RDV Fixé', color: 'bg-purple-100 text-purple-800' },
  { id: 'won', label: 'Signé', color: 'bg-green-100 text-green-800' },
  { id: 'lost', label: 'Non Conclus', color: 'bg-red-100 text-red-800' },
  { id: 'archived', label: 'Archivé', color: 'bg-slate-100 text-slate-500' },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState<'board' | 'clients' | 'chats' | 'settings'>('board');
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [chats, setChats] = useState<ChatLog[]>([]);
  
  const [selectedLead, setSelectedLead] = useState<LeadData | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');
  
  // Add Lead Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({ name: '', email: '', phone: '', description: '', status: 'new' as LeadStatus });

  // Initial Check for Session
  useEffect(() => {
    if (isOpen) {
        checkSession();
    }
  }, [isOpen]);

  const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
          // Double check email even if session exists
          if (ALLOWED_EMAILS.includes(session.user.email || '')) {
             setIsAuthenticated(true);
             loadData();
          } else {
             await supabase.auth.signOut();
             setAuthError("Email non autorisé.");
          }
      }
  };

  const loadData = async () => {
      setIsLoading(true);
      // Fetch Leads
      const { data: leadsData, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (leadsData) {
          // Map DB columns to our Types
          const mappedLeads: LeadData[] = leadsData.map((l: any) => ({
              id: l.id.toString(),
              name: l.name,
              email: l.email,
              phone: l.phone,
              description: l.description,
              source: l.source,
              timestamp: l.created_at,
              status: l.status,
              adminNotes: l.admin_notes
          }));
          setLeads(mappedLeads);
      }

      // Fetch Chats
      const { data: chatsData } = await supabase
        .from('chats')
        .select('*')
        .order('created_at', { ascending: false });

      if (chatsData) {
         const mappedChats: ChatLog[] = chatsData.map((c: any) => ({
             id: c.id.toString(),
             user: c.user_name,
             query: c.query,
             response: c.response,
             timestamp: c.created_at
         }));
         setChats(mappedChats);
      }
      setIsLoading(false);
  };

  // AUTHENTICATION FUNCTIONS
  const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setAuthError('');

      // 1. Check Whitelist BEFORE sending to Supabase to save API calls/time
      if (!ALLOWED_EMAILS.includes(emailInput)) {
         setAuthError("Cet email n'a pas accès au dashboard.");
         setIsLoading(false);
         return;
      }

      // 2. Auth with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailInput,
        password: passwordInput,
      });

      if (error) {
          setAuthError("Mot de passe incorrect.");
          setIsLoading(false);
      } else {
          setIsAuthenticated(true);
          loadData();
          setIsLoading(false);
      }
  };

  const handleLogout = async () => {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setEmailInput('');
      setPasswordInput('');
  };

  // DATA FUNCTIONS (REAL TIME DB UPDATES)
  const moveCard = async (leadId: string, newStatus: LeadStatus) => {
    // Optimistic Update
    const updatedLeads = leads.map(lead => 
        lead.id === leadId ? { ...lead, status: newStatus } : lead
    );
    setLeads(updatedLeads);
    if(selectedLead && selectedLead.id === leadId) {
        setSelectedLead({...selectedLead, status: newStatus});
    }

    // DB Update
    await supabase.from('leads').update({ status: newStatus }).eq('id', leadId);
  };

  // Save Admin Note
  const saveNote = async () => {
      if(!selectedLead) return;
      
      const updatedLeads = leads.map(lead => 
          lead.id === selectedLead.id ? { ...lead, adminNotes: adminNoteInput } : lead
      );
      setLeads(updatedLeads);
      setSelectedLead({...selectedLead, adminNotes: adminNoteInput});

      await supabase.from('leads').update({ admin_notes: adminNoteInput }).eq('id', selectedLead.id);
  };

  const openLeadDetail = (lead: LeadData) => {
      setSelectedLead(lead);
      setAdminNoteInput(lead.adminNotes || '');
  };

  // Add Lead
  const handleAddLead = async (e: React.FormEvent) => {
      e.preventDefault();
      
      const { data, error } = await supabase.from('leads').insert([{
          name: newLeadForm.name,
          email: newLeadForm.email,
          phone: newLeadForm.phone,
          description: newLeadForm.description,
          source: 'manual',
          status: newLeadForm.status
      }]).select();

      if (data) {
          loadData(); // Reload to get the new ID and correct timestamp
          setShowAddModal(false);
          setNewLeadForm({ name: '', email: '', phone: '', description: '', status: 'new' });
      }
  };

  // Export Data to CSV
  const exportToCSV = (type: 'leads' | 'chats') => {
    let filename = `kinva_export_${type}.csv`;
    let headers = "";
    let rows: string[] = [];

    if (type === 'leads') {
        headers = "Email Address,First Name,Last Name,Phone Number,Tags,Status";
        rows = leads.map((item: any) => {
            const email = item.email || "";
            const fullName = item.name || "";
            const [firstName, ...lastNameParts] = fullName.split(' ');
            const lastName = lastNameParts.join(' ');
            const phone = item.phone || "";
            const tags = `${item.source}`;
            return `"${email}","${firstName || ''}","${lastName || ''}","${phone}","${tags}","${item.status}"`;
        });
    } else {
        if (chats.length === 0) return;
        headers = "User,Query,Response,Date";
        rows = chats.map(c => `"${c.user}","${c.query}","${c.response}","${c.timestamp}"`);
    }

    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate Stats
  const totalValue = leads.filter(l => l.status === 'won').length * 1500 + leads.filter(l => l.status === 'meeting').length * 200;

  if (!isOpen) return null;

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
      return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4"
        >
            <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl"
            >
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                        <Lock className="w-8 h-8 text-slate-800" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Kinva Admin</h2>
                <p className="text-center text-slate-500 mb-8 text-sm">Connexion Sécurisée (Luc Rabe Only)</p>
                
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email</label>
                        <input 
                            type="email" 
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mot de passe</label>
                        <input 
                            type="password" 
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 outline-none"
                            required
                        />
                    </div>
                    {authError && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            {authError}
                        </div>
                    )}
                    <Button type="submit" disabled={isLoading} className="w-full bg-slate-900 text-white">
                        {isLoading ? 'Vérification...' : 'Se Connecter'}
                    </Button>
                </form>
                <button onClick={onClose} className="w-full mt-4 text-slate-400 text-sm hover:text-slate-600">
                    Retour au site
                </button>
            </motion.div>
        </motion.div>
      );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-slate-100 rounded-2xl w-full max-w-[95vw] h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex justify-between items-center shrink-0 shadow-md z-20">
          <div className="flex items-center gap-4">
             <div className="p-2 bg-brand-teal rounded-lg">
               <Shield className="w-5 h-5 text-white" />
             </div>
             <div>
                <h2 className="font-bold text-lg leading-none">Kinva CRM</h2>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                   <span>Live Database</span>
                   <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                   <span>{leads.length} Prospects</span>
                </div>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full text-xs font-bold text-slate-300">
                <User className="w-3 h-3" />
                Luc Rabe
             </div>
             <button onClick={handleLogout} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white" title="Déconnexion">
                <LogOut className="w-5 h-5" />
             </button>
             <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
                <X className="w-6 h-6" />
             </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="p-4 bg-white border-b border-slate-200 flex flex-wrap gap-4 items-center justify-between shrink-0 z-10">
           <div className="flex gap-2 bg-slate-100 p-1 rounded-lg overflow-x-auto">
              <button onClick={() => setActiveTab('board')} className={`px-4 py-2 rounded-md font-bold text-sm flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'board' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>
                 <Users className="w-4 h-4" /> Pipeline
              </button>
              <button onClick={() => setActiveTab('clients')} className={`px-4 py-2 rounded-md font-bold text-sm flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'clients' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>
                 <List className="w-4 h-4" /> Liste
              </button>
              <button onClick={() => setActiveTab('chats')} className={`px-4 py-2 rounded-md font-bold text-sm flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'chats' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>
                 <MessageSquare className="w-4 h-4" /> Chat Logs
              </button>
           </div>
           
           <div className="flex gap-2">
              <Button onClick={() => setShowAddModal(true)} className="py-2 px-4 text-xs h-auto bg-brand-teal hover:bg-brand-teal/90 text-white">
                 <Plus className="w-3 h-3 mr-2" /> Add Lead
              </Button>
              <Button onClick={() => exportToCSV('leads')} className="py-2 px-4 text-xs h-auto bg-slate-900 hover:bg-slate-800 text-white">
                 <Download className="w-3 h-3 mr-2" /> Export
              </Button>
           </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden relative bg-slate-50">
           
           {isLoading && (
               <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-50">
                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-teal"></div>
               </div>
           )}

           {activeTab === 'board' && (
              // KANBAN BOARD
              <div className="h-full overflow-x-auto overflow-y-hidden p-6">
                 <div className="flex h-full gap-6 min-w-max">
                    {COLUMNS.map(col => (
                        <div key={col.id} className="w-80 flex flex-col h-full rounded-xl bg-slate-200/50 border border-slate-200/60">
                            <div className="p-3 flex items-center justify-between font-bold text-sm text-slate-700 uppercase tracking-wide border-b border-slate-200/50 bg-slate-100/50 rounded-t-xl backdrop-blur-sm">
                                <div className="flex items-center gap-2">
                                   <div className={`w-3 h-3 rounded-full ${col.color.split(' ')[0].replace('bg-', 'bg-')}`}></div>
                                   {col.label}
                                </div>
                                <span className="bg-white px-2 py-0.5 rounded-md text-xs shadow-sm text-slate-500">
                                   {leads.filter(l => l.status === col.id).length}
                                </span>
                            </div>
                            <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
                                {leads.filter(l => l.status === col.id).map(lead => (
                                    <motion.div 
                                      layoutId={lead.id}
                                      key={lead.id}
                                      onClick={() => openLeadDetail(lead)}
                                      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md cursor-pointer border border-slate-200 hover:border-brand-teal/50 transition-all group"
                                    >
                                       <div className="flex justify-between items-start mb-2">
                                          <h4 className="font-bold text-slate-900 truncate pr-2">{lead.name}</h4>
                                          <span className="text-[10px] text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded whitespace-nowrap">
                                             {new Date(lead.timestamp).toLocaleDateString()}
                                          </span>
                                       </div>
                                       <div className="text-xs text-slate-500 mb-3 line-clamp-2">
                                          {lead.description || "Pas de description"}
                                       </div>
                                       <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50">
                                          <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${lead.source === 'chatbot' ? 'bg-cyan-50 text-cyan-600' : lead.source === 'manual' ? 'bg-amber-50 text-amber-600' : 'bg-purple-50 text-purple-600'}`}>
                                             {lead.source}
                                          </span>
                                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                                             {col.id !== 'archived' && (
                                                <button 
                                                   onClick={() => moveCard(lead.id, COLUMNS[Math.min(COLUMNS.length-1, COLUMNS.findIndex(c => c.id === col.id) + 1)].id)}
                                                   className="p-1 hover:bg-slate-100 rounded text-slate-500" title="Next Stage"
                                                >
                                                   <ArrowRight className="w-3 h-3" />
                                                </button>
                                             )}
                                          </div>
                                       </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                 </div>
              </div>
           )}

           {activeTab === 'clients' && (
               // CLIENTS TABLE VIEW
               <div className="h-full overflow-y-auto p-8">
                   <div className="max-w-6xl mx-auto">
                       <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                           <Users className="w-5 h-5" /> Base de données complète
                       </h3>
                       <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-12">
                           <table className="w-full text-sm text-left text-slate-600">
                               <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-xs border-b border-slate-200">
                                   <tr>
                                       <th className="px-6 py-4">Nom</th>
                                       <th className="px-6 py-4">Email</th>
                                       <th className="px-6 py-4">Téléphone</th>
                                       <th className="px-6 py-4">Status</th>
                                       <th className="px-6 py-4">Source</th>
                                       <th className="px-6 py-4">Date</th>
                                       <th className="px-6 py-4 text-right">Actions</th>
                                   </tr>
                               </thead>
                               <tbody className="divide-y divide-slate-100">
                                   {leads.map(lead => (
                                       <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                                           <td className="px-6 py-4 font-bold text-slate-900">{lead.name}</td>
                                           <td className="px-6 py-4">{lead.email}</td>
                                           <td className="px-6 py-4">{lead.phone}</td>
                                           <td className="px-6 py-4">
                                               <span className={`px-2 py-1 rounded-full text-xs font-bold ${COLUMNS.find(c => c.id === lead.status)?.color}`}>
                                                   {COLUMNS.find(c => c.id === lead.status)?.label}
                                               </span>
                                           </td>
                                           <td className="px-6 py-4 uppercase text-xs font-bold">{lead.source}</td>
                                           <td className="px-6 py-4 text-xs">{new Date(lead.timestamp).toLocaleDateString()}</td>
                                           <td className="px-6 py-4 text-right">
                                               <button onClick={() => openLeadDetail(lead)} className="text-brand-teal hover:underline font-bold">Détails</button>
                                           </td>
                                       </tr>
                                   ))}
                               </tbody>
                           </table>
                       </div>
                   </div>
               </div>
           )}

           {activeTab === 'chats' && (
             <div className="h-full overflow-y-auto p-6">
                <div className="max-w-4xl mx-auto space-y-4">
                  {chats.map((chat) => (
                      <div key={chat.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4 border-b border-slate-50 pb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                    <User className="w-4 h-4" />
                                </div>
                                <span className="font-bold text-slate-900">{chat.user}</span>
                            </div>
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(chat.timestamp).toLocaleString()}
                            </span>
                        </div>
                        <div className="grid gap-4 text-sm">
                            <div className="pl-4 border-l-2 border-slate-200">
                                <strong className="block text-xs text-slate-400 mb-1 uppercase tracking-wider">Client</strong>
                                <p className="text-slate-700">{chat.query}</p>
                            </div>
                            <div className="pl-4 border-l-2 border-brand-teal bg-cyan-50/50 p-3 rounded-r-lg">
                                <strong className="block text-xs text-brand-teal mb-1 uppercase tracking-wider">Rabe IA</strong>
                                <p className="text-slate-800">{chat.response}</p>
                            </div>
                        </div>
                      </div>
                  ))}
                </div>
             </div>
           )}

           {/* --- LEAD DETAIL MODAL --- */}
           <AnimatePresence>
             {selectedLead && (
                <motion.div 
                   initial={{ opacity: 0, x: '100%' }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: '100%' }}
                   className="absolute top-0 right-0 h-full w-full md:w-[500px] bg-white shadow-2xl border-l border-slate-200 z-50 flex flex-col"
                >
                   <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                      <div>
                          <h3 className="font-bold text-xl text-slate-900">{selectedLead.name}</h3>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                             <Calendar className="w-3 h-3" />
                             Créé le {new Date(selectedLead.timestamp).toLocaleDateString()}
                          </span>
                      </div>
                      <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                         <X className="w-5 h-5 text-slate-500" />
                      </button>
                   </div>
                   
                   <div className="flex-1 overflow-y-auto p-6 space-y-8">
                      {/* Status Selector */}
                      <div>
                         <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Statut du Lead</label>
                         <div className="flex flex-wrap gap-2">
                            {COLUMNS.map(col => (
                               <button 
                                 key={col.id}
                                 onClick={() => moveCard(selectedLead.id, col.id)}
                                 className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${selectedLead.status === col.id ? col.color + ' border-transparent ring-2 ring-offset-1 ring-slate-300' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}
                               >
                                  {col.label}
                               </button>
                            ))}
                         </div>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-4">
                         <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                            <Mail className="w-5 h-5 text-slate-400" />
                            <a href={`mailto:${selectedLead.email}`} className="text-blue-600 hover:underline font-medium">{selectedLead.email}</a>
                         </div>
                         <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                            <Phone className="w-5 h-5 text-slate-400" />
                            <a href={`tel:${selectedLead.phone}`} className="text-slate-700 font-medium">{selectedLead.phone}</a>
                         </div>
                      </div>

                      {/* Description */}
                      <div>
                         <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Contexte</label>
                         <div className="p-4 bg-slate-50 rounded-xl text-slate-700 text-sm leading-relaxed border border-slate-100">
                            {selectedLead.description || "Aucune information."}
                         </div>
                      </div>

                      {/* Admin Notes */}
                      <div>
                         <label className="text-xs font-bold text-brand-teal uppercase tracking-wider mb-2 flex items-center gap-2">
                            <Edit2 className="w-3 h-3" />
                            Notes Internes
                         </label>
                         <textarea 
                           className="w-full h-32 p-4 rounded-xl border border-slate-300 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-sm text-slate-700 resize-none bg-yellow-50/50"
                           placeholder="Ajouter des notes..."
                           value={adminNoteInput}
                           onChange={(e) => setAdminNoteInput(e.target.value)}
                         ></textarea>
                         <div className="flex justify-end mt-2">
                            <Button onClick={saveNote} className="py-2 px-4 text-xs h-auto bg-slate-900 text-white">
                               <Save className="w-3 h-3 mr-1" /> Enregistrer
                            </Button>
                         </div>
                      </div>
                   </div>
                </motion.div>
             )}
           </AnimatePresence>

           {/* --- ADD LEAD MODAL --- */}
           <AnimatePresence>
               {showAddModal && (
                   <motion.div
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       exit={{ opacity: 0 }}
                       className="absolute inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
                   >
                       <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
                           <h3 className="text-xl font-bold text-slate-900 mb-6">Ajouter un Prospect</h3>
                           <form onSubmit={handleAddLead} className="space-y-4">
                               <input type="text" placeholder="Nom Complet" required className="w-full p-3 border border-slate-200 rounded-lg text-sm" value={newLeadForm.name} onChange={e => setNewLeadForm({...newLeadForm, name: e.target.value})} />
                               <input type="email" placeholder="Email" required className="w-full p-3 border border-slate-200 rounded-lg text-sm" value={newLeadForm.email} onChange={e => setNewLeadForm({...newLeadForm, email: e.target.value})} />
                               <input type="tel" placeholder="Téléphone" required className="w-full p-3 border border-slate-200 rounded-lg text-sm" value={newLeadForm.phone} onChange={e => setNewLeadForm({...newLeadForm, phone: e.target.value})} />
                               <textarea placeholder="Description / Besoin" className="w-full p-3 border border-slate-200 rounded-lg text-sm h-24 resize-none" value={newLeadForm.description} onChange={e => setNewLeadForm({...newLeadForm, description: e.target.value})}></textarea>
                               <div className="flex gap-3 mt-6">
                                   <Button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-slate-100 text-slate-700 hover:bg-slate-200">Annuler</Button>
                                   <Button type="submit" className="flex-1 bg-brand-teal text-white">Créer</Button>
                               </div>
                           </form>
                       </div>
                   </motion.div>
               )}
           </AnimatePresence>

        </div>
      </motion.div>
    </motion.div>
  );
};

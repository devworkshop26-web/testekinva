
import { createClient } from '@supabase/supabase-js';

// REMPLACE CES VALEURS PAR CELLES DE TON PROJET SUPABASE (Settings > API)
// Hostinger ne lira pas process.env facilement sans build complexe, donc on les met ici pour l'instant.
// Une fois le site en ligne, assure-toi de configurer les règles de sécurité (RLS) sur Supabase pour protéger tes données.

const SUPABASE_URL = 'https://ton-projet-id.supabase.co'; // REMPLACE CECI
const SUPABASE_ANON_KEY = 'ton-api-key-publique'; // REMPLACE CECI

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

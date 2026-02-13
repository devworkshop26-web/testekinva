import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const DOCS: Record<string, string> = {
  documentation: "../../public/docs/Kinva_Documentation.md",
  chatbot: "../../public/docs/Kinva_Chatbot_Instructions_System.md",
};

const Documentation = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const file = slug ? DOCS[slug] : DOCS.documentation;

    if (!file) {
      setError("Documentation introuvable");
      return;
    }

    fetch(file)
      .then((res) => {
        if (!res.ok) throw new Error("Impossible de charger le fichier");
        return res.text();
      })
      .then(setContent)
      .catch(() => setError("Erreur de chargement"));
  }, [slug]);

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 prose prose-slate">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default Documentation;

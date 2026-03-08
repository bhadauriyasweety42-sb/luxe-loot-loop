import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { toast } from 'sonner';
import { Send } from 'lucide-react';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Message sent! We'll get back to you soon.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl font-bold text-foreground">Get in Touch</h1>
          <p className="mt-2 text-muted-foreground">We'd love to hear from you. Send us a message and we'll respond promptly.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-xl bg-card p-8 shadow-elevated">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">Name</label>
            <input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
              className="w-full rounded-md border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
            <input id="c-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
              className="w-full rounded-md border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">Message</label>
            <textarea id="message" rows={5} value={message} onChange={e => setMessage(e.target.value)} placeholder="How can we help?"
              className="w-full rounded-md border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
          </div>
          <button type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            <Send className="h-4 w-4" /> Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;

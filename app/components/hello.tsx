import { useState, useEffect, useRef, FormEvent } from "react";
import { Send, Loader2, CheckCircle, AlertCircle, User, Mail, MessageSquare } from 'lucide-react';


export default function ContactForm() {
  //UI state management
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Validation state
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;

  //Form data storage
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })

  const formRef = useRef<HTMLFormElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target
    setForm(prev =>  ({...prev, [name]: value}))


    

  }















} 
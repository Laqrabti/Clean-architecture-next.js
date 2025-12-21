"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import { 
  User, Mail, MessageSquare, Send, Loader2, 
  CheckCircle, AlertCircle, Eye, EyeOff 
} from 'lucide-react'
import debounce from 'lodash/debounce';

interface FormData {
  name: string
  email: string
  password: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  password?: string
  message?: string
}

interface ValidationRules {
  [key: string]: (value: string) => string | undefined
}

export default function ModernContactForm() {
  // State
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [showAllErrors, setShowAllErrors] = useState(false)
  
  const formRef = useRef<HTMLFormElement>(null)
  const firstErrorRef = useRef<HTMLDivElement>(null)

  // Validation rules
  const validationRules: ValidationRules = {
    name: (value) => {
      if (!value.trim()) return 'Name is required'
      if (value.length < 2) return 'Name must be at least 2 characters'
      if (!/^[a-zA-Z\s]+$/.test(value)) return 'Name can only contain letters and spaces'
      return undefined
    },
    email: (value) => {
      if (!value) return 'Email is required'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email'
      return undefined
    },
    password: (value) => {
      if (!value) return 'Password is required'
      if (value.length < 8) return 'Password must be at least 8 characters'
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        return 'Password must contain uppercase, lowercase, and numbers'
      }
      return undefined
    },
    message: (value) => {
      if (!value.trim()) return 'Message is required'
      if (value.length < 10) return 'Message must be at least 10 characters'
      if (value.length > 1000) return 'Message must be less than 1000 characters'
      return undefined
    }
  }

  // Validate single field
  const validateField = useCallback((name: string, value: string): string | undefined => {
    const validator = validationRules[name]
    return validator ? validator(value) : undefined
  }, [])

  // Debounced validation
  const debouncedValidate = useCallback(
    debounce((name: string, value: string) => {
      if (touched[name]) {
        const error = validateField(name, value)
        setErrors(prev => ({ ...prev, [name]: error }))
      }
    }, 500),
    [touched, validateField]
  )

  // Handle input change with validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const shouldValidate = touched[name] || showAllErrors
    
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (shouldValidate) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    } else {
      debouncedValidate(name, value)
    }
  }

  // Handle blur (mark as touched and validate)
  const handleBlur = (field: string) => {
    if (!touched[field]) {
      setTouched(prev => ({ ...prev, [field]: true }))
      const error = validateField(field, formData[field as keyof FormData])
      setErrors(prev => ({ ...prev, [field]: error }))
    }
  }

  // Focus first error on submit
  useEffect(() => {
    if (showAllErrors && firstErrorRef.current) {
      firstErrorRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      })
      firstErrorRef.current.focus()
    }
  }, [showAllErrors])

  // Save non-sensitive fields to localStorage
  useEffect(() => {
    const saveData = () => {
      const { password, ...safeData } = formData
      localStorage.setItem('formDraft', JSON.stringify(safeData))
    }
    
    const timer = setTimeout(saveData, 500)
    return () => clearTimeout(timer)
  }, [formData])

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('formDraft')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setFormData(prev => ({ ...prev, ...parsed }))
      } catch (e) {
        console.warn('Failed to parse saved form data')
      }
    }
  }, [])

  // Check if form is valid
  const isFormValid = useCallback(() => {
    return Object.keys(validationRules).every(field => {
      const error = validateField(field, formData[field as keyof FormData])
      return !error
    })
  }, [formData, validateField])

  // Get first error field for focus
  const getFirstErrorField = useCallback(() => {
    for (const field of Object.keys(validationRules)) {
      const error = validateField(field, formData[field as keyof FormData])
      if (error) return field
    }
    return null
  }, [formData, validateField])

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Mark all fields as touched and validate all
    const newTouched = Object.keys(validationRules).reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {} as Record<string, boolean>)
    
    setTouched(newTouched)
    setShowAllErrors(true)
    
    // Validate all fields
    const newErrors: FormErrors = {}
    Object.keys(validationRules).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData])
      if (error) newErrors[key] = error
    })
    
    setErrors(newErrors)
    
    // Check if form is valid
    if (!isFormValid()) {
      const firstError = getFirstErrorField()
      if (firstError) {
        setTimeout(() => {
          document.getElementById(firstError)?.focus()
        }, 100)
      }
      return
    }
    
    // Submit form
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Clear localStorage on success
      localStorage.removeItem('formDraft')
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', password: '', message: '' })
      setTouched({})
      setErrors({})
      setShowAllErrors(false)
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 3000)
      
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Clear form
  const handleClear = () => {
    setFormData({ name: '', email: '', password: '', message: '' })
    setErrors({})
    setTouched({})
    setShowAllErrors(false)
    localStorage.removeItem('formDraft')
  }

  // Field components for reusability
  const InputField = ({ 
    name, label, type = 'text', icon: Icon, required = true 
  }: {
    name: keyof FormData
    label: string
    type?: string
    icon: React.ElementType
    required?: boolean
  }) => {
    const error = errors[name]
    const isTouched = touched[name]
    const showError = (isTouched || showAllErrors) && error
    
    return (
      <div className="space-y-2" ref={showError ? firstErrorRef : null}>
        <label 
          htmlFor={name}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          <Icon className="w-4 h-4" />
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
        
        <div className="relative">
          <input
            id={name}
            name={name}
            type={type === 'password' && showPassword ? 'text' : type}
            value={formData[name]}
            onChange={handleChange}
            onBlur={() => handleBlur(name)}
            disabled={isSubmitting}
            className={`
              w-full px-4 py-3 pl-11 rounded-lg border transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-offset-2
              ${showError
                ? 'border-red-500 focus:ring-red-500 bg-red-50/50 dark:bg-red-900/10'
                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 bg-white dark:bg-gray-800'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
              dark:text-white placeholder-gray-400 dark:placeholder-gray-500
            `}
            placeholder={`Enter your ${label.toLowerCase()}`}
            aria-invalid={!!showError}
            aria-describedby={showError ? `${name}-error` : undefined}
          />
          
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          
          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
        </div>
        
        {showError && (
          <p 
            id={`${name}-error`}
            className="text-red-600 dark:text-red-400 text-sm flex items-center gap-1"
            role="alert"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 md:p-8">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Contact Us
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Fill in the form below and we'll get back to you within 24 hours.
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField 
              name="name"
              label="Full Name"
              icon={User}
            />
            
            <InputField 
              name="email"
              label="Email Address"
              type="email"
              icon={Mail}
            />
          </div>

          <InputField 
            name="password"
            label="Password"
            type="password"
            icon={Eye}
          />

          <div className="space-y-2">
            <label 
              htmlFor="message"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <MessageSquare className="w-4 h-4" />
              Message
              <span className="text-red-500">*</span>
            </label>
            
            <div className="relative">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={() => handleBlur('message')}
                disabled={isSubmitting}
                rows={4}
                maxLength={1000}
                className={`
                  w-full px-4 py-3 pl-11 rounded-lg border transition-all duration-200 resize-none
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${(touched.message || showAllErrors) && errors.message
                    ? 'border-red-500 focus:ring-red-500 bg-red-50/50 dark:bg-red-900/10'
                    : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 bg-white dark:bg-gray-800'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                  dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                `}
                placeholder="Tell us about your project or inquiry..."
                aria-invalid={!!errors.message && (touched.message || showAllErrors)}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              
              <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
              
              <div className="absolute bottom-2 right-3">
                <span className={`text-xs ${formData.message.length > 900 ? 'text-red-500' : 'text-gray-500'}`}>
                  {formData.message.length}/1000
                </span>
              </div>
            </div>
            
            {(touched.message || showAllErrors) && errors.message && (
              <p 
                id="message-error"
                className="text-red-600 dark:text-red-400 text-sm flex items-center gap-1"
                role="alert"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {errors.message}
              </p>
            )}
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div 
              className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 animate-fade-in"
              role="alert"
            >
              <p className="text-green-800 dark:text-green-300 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                Message sent successfully! We'll contact you soon.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div 
              className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
              role="alert"
            >
              <p className="text-red-800 dark:text-red-300 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                Something went wrong. Please try again or contact support.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200
                flex items-center justify-center gap-2
                ${isSubmitting || !isFormValid()
                  ? 'opacity-50 cursor-not-allowed bg-gray-300 dark:bg-gray-700'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98]'
                }
                text-white shadow-lg hover:shadow-xl
              `}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={handleClear}
              disabled={isSubmitting}
              className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                       text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800
                       transition-colors disabled:opacity-50"
            >
              Clear Form
            </button>
          </div>

          {/* Helper Text */}
          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <p>
              Your data is automatically saved locally (except password). 
              We'll never share your information with third parties.
            </p>
            <p>
              By submitting, you agree to our{' '}
              <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                Privacy Policy
              </a>
              {' '}and{' '}
              <a href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                Terms of Service
              </a>.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
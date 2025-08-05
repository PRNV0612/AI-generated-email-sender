import { useState } from 'react'
import EmailGenerator from './components/EmailGenerator'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI Email Generator
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create professional emails with AI assistance. Simply provide your prompt and recipients, 
              then let our AI generate a polished email that you can edit and send.
            </p>
          </div>
          <EmailGenerator />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App

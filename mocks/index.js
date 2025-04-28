  
  
  if (process.env.NODE_ENV === 'development') {
     if (typeof window === 'undefined') {
       // For Node.js environment (SSR)
       const { mockServer } = require('./mockContactApi')
       mockServer.listen()
     } else {
       // For browser environment
       const { worker } = require('./browser')
       worker.start()
     }
   }
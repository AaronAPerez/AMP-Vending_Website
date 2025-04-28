import { setupWorker } from 'msw'
    import { handlers } from './mockContactApi'
    
   export const worker = setupWorker(...handlers)
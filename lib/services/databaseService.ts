// import { supabaseServer } from '../supabase';
// import { ContactFormData } from '../schema/contactFormSchema';

// export class DatabaseService {
//   /**
//    * Save contact form submission to database
//    */
//   async saveContactSubmission(data: ContactFormData): Promise<boolean> {
//     try {
//       // Convert form data to database format
//       const dbRecord = {
//         first_name: data.firstName,
//         last_name: data.lastName,
//         email: data.email,
//         phone: data.phone || null,
//         company_name: data.companyName,
//         job_title: data.jobTitle || null,
//         employee_count: data.employeeCount,
//         street_address: data.streetAddress,
//         city: data.city,
//         state: data.state,
//         zip_code: data.zipCode,
//         interested_machine: data.interestedMachine,
//         message: data.message || null,
//         preferred_contact: data.preferredContact
//       };
      
//       // Insert data into the database
//       const { error } = await supabaseServer
//         .from('contact_submissions')
//         .insert(dbRecord);
        
//       if (error) {
//         console.error('Error saving to database:', error);
//         return false;
//       }
      
//       return true;
//     } catch (error) {
//       console.error('Database error:', error);
//       return false;
//     }
//   }
  
//   /**
//    * Get all contact submissions
//    */
//   async getAllContactSubmissions() {
//     try {
//       const { data, error } = await supabaseServer
//         .from('contact_submissions')
//         .select('*')
//         .order('created_at', { ascending: false });
      
//       if (error) {
//         console.error('Error fetching contact submissions:', error);
//         return [];
//       }
      
//       return data || [];
//     } catch (error) {
//       console.error('Database error:', error);
//       return [];
//     }
//   }
  
//   /**
//    * Update submission status
//    */
//   async updateSubmissionStatus(id: string, status: string) {
//     try {
//       const { error } = await supabaseServer
//         .from('contact_submissions')
//         .update({ status })
//         .eq('id', id);
      
//       if (error) {
//         console.error('Error updating status:', error);
//         return false;
//       }
      
//       return true;
//     } catch (error) {
//       console.error('Database error:', error);
//       return false;
//     }
//   }
// }

// export const databaseService = new DatabaseService();
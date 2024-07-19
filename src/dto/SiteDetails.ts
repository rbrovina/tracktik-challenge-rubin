export interface MainContact {
    email: string;
    firstName: string;
    jobTitle: string;
  }
  
  export interface Contact {
    main: MainContact;
  }
  
  export interface SiteDetails {
    id: string;
    clientId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    images: string[];
    tags: string[];
    contacts: Contact;
  }
  
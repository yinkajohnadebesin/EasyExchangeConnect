export const patterns = {
    Student_ID: /^[a-zA-Z]\d{8}$/,
    Student_FirstName: /^[a-zA-Z]+$/,
    Student_LastName: /^[a-zA-Z]+$/,
    Student_Email: /^[a-zA-Z]\d{8}@mytudublin\.ie$/,
    Student_Username: /^[a-z0-9-]{5,15}$/,
    Student_Password: /^(?=.*[a-zA-Z])(?=.*[a-z])(?=.*\d{3,})(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,20}$/,
  };
  
  export const patterns_L = {
    Lecturer_ID: /^L\d{8}$/, // e.g., L12345678
    Lecturer_FirstName: /^[a-zA-Z]+$/, 
    Lecturer_LastName: /^[a-zA-Z]+$/, 
    Lecturer_Email: /^[a-z]+\.[a-z]+@tudublin\.ie$/, 
    Lecturer_Username: /^[a-z0-9-]{5,15}$/, 
    Lecturer_Password: /^(?=.*[a-zA-Z])(?=.*[a-z])(?=(.*\d){3,})(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,20}$/
};
  
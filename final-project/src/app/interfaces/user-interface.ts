export interface User {
  firstName: string;
  lastName: string;
  age: number;
  phone: string;
  company: {
    companyName: string,
    companyCatchPhrase: string,
    companyBs: string,
  };
}

type EmployerDetails =
    | {
          logoUrl: string | null;
          companyName: string | null;
          employerName: string | null;
          employerPosition: string | null;
          about: string | null;
          companyWebsite: string | null;
      }
    | Record<string, never>;

export { type EmployerDetails };

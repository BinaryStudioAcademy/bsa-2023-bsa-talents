//TODO: mock data, will get this from db
type Option = {
    label: string;
    value: string;
};
const mockSoftSkills: Option[] = [
    { value: 'Communicative', label: 'Communicative' },
    { value: 'Collaboration', label: 'Collaboration' },
    { value: 'Problem-solving', label: 'Problem-solving' },
    { value: 'Leadership', label: 'Leadership' },
    { value: 'Creative', label: 'Creative' },
    { value: 'Proactive', label: 'Proactive' },
    { value: 'Flexibility', label: 'Flexibility' },
];

export { mockSoftSkills };

export default function DateFormater({ date }: { date: Date }) {
    const formattedDate = new Date(date).toLocaleDateString();
    return <div>{formattedDate}</div>;
};

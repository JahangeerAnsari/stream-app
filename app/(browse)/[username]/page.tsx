interface UserNameProps{
    params: {
        username: string;
 }
}
const UserPage = ({params}: UserNameProps) => {
    return <div>User Page {params.username}</div>;
};
export default UserPage;
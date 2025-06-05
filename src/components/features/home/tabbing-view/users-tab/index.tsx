import { useContext, useMemo } from "react";
import { VariableSizeList as List } from "react-window";
import { UsersContext } from "../../../../../contexts/users-context";

const UsersTab = () => {
  return (
    <>
      <MyList />
    </>
  );
};

const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
  const usersContext = useContext(UsersContext);
  const users = useMemo(() => {
    return usersContext.users;
  }, [usersContext.users]);
  const isSelected = useMemo(() => {
    return usersContext.selectedUserIds.includes(users[index].id);
  }, [index, users, usersContext.selectedUserIds]);
  return (
    <div key={index} className="" style={style}>
      <div className="ring-1 flex rounded-xl !w-[calc(100%-1rem)] mx-1 !my-2 items-center justify-end gap-2  p-1">
        {users[index].name}
        <img src={users[index].profile} alt="user" className="w-14 h-14 rounded-full" />
        <input checked={isSelected} onChange={()=>{
          if(isSelected){
            usersContext.setSelectedUserIds(usersContext.selectedUserIds.filter(id=>id!==users[index].id))
          }else{
            usersContext.setSelectedUserIds([...usersContext.selectedUserIds,users[index].id])
          }
        }} type="checkbox" className="w-5 h-5" />
      </div>
    </div>
  );
};

export default UsersTab;

const getItemSize = () => 90;

const MyList = () => {
  const usersContext = useContext(UsersContext);

  return (
    <List width={400} height={450} itemCount={usersContext.users.length} itemSize={getItemSize} className="!w-full mt-5">
      {Row}
    </List>
  );
};

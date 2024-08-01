import Conversation from "../components/ConversationView/Conversation";
import Sidebar from "../components/sidebar/Sidebar";

const Game = ()=>{
    return(
        <div style={{display:"flex", width:"100vw",position:"relative"}} className="App">
        <div style={{flexShrink: 0}}>
          <Sidebar/>
        </div>
        <div style={{flexGrow: 1}}>
          <Conversation/>
        </div>
      </div>

    );
}
export default Game
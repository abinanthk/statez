import SampleApi from "./sample/SampleApi";
import SampleForm from "./sample/SampleForm";
import SampleTodoList from "./sample/SampleTodoList";

const App = () => {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <SampleTodoList />
      <SampleTodoList />
    </div>
  );
  // return <SampleForm />;
  // return <SampleApi />;
};

export default App;

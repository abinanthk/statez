import { useStore, Form } from "@statez/react";

const SampleForm = () => {
  const formStore = useStore(
    {
      state: {
        username: "",
        password: "",
      },
      saver: (state) => {
        console.log("save", state);
      },
    },
    []
  );

  console.log("reder");
  return (
    <Form.Root store={formStore}>
      <Form.Field
        name={"username"}
        children={(state: typeof formStore.state) => (
          <div>
            <span>Username</span>
            <input
              value={state.username}
              onChange={(e) => (state.username = e.target.value)}
            />
          </div>
        )}
      />

      <Form.Field
        name={"password"}
        children={(state: typeof formStore.state) => (
          <div>
            <span>Password</span>
            <input
              value={state.password}
              onChange={(e) => (state.password = e.target.value)}
            />
          </div>
        )}
      />
      <button onClick={() => formStore.save()}>login</button>
    </Form.Root>
  );
};

export default SampleForm;

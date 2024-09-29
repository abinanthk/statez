import { useStore } from "@statez/react";

const myAPi = (): Promise<{ username: string; password: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ username: "admin", password: "admin123" });
    }, 2000);
  });
};

const SampleApi = () => {
  const apiStore = useStore({
    state: {
      username: "",
      password: "",
    },
    loader: async (state) => {
      const res = await myAPi();

      console.log("res", res);
      state.username = res.username;
      state.password = res.password;
    },
    saver: (state) => {
      console.log("save", state);
    },
    autoLoad: true,
  });

  console.log("rederr");
  return (
    <div>
      <div>
        <span>Username: {apiStore.state.username}</span>
      </div>
      <div>
        <span>password: {apiStore.state.password}</span>
      </div>
    </div>
  );
};

export default SampleApi;

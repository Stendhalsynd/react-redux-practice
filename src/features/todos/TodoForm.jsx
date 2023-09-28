import { useForm, Controller } from "react-hook-form";
import { todoAdded } from "./todosSlice";

export default function TodoForm({ dispatch }) {
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    dispatch(todoAdded(data.textInput));
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "10px",
        width: "100%",
      }}
    >
      <Controller
        name="textInput"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input
            type="text"
            {...field}
            placeholder="Add to do"
            style={{ width: "90vw" }}
          />
        )}
      />
      <button type="submit">add</button>
    </form>
  );
}

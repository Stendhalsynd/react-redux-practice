import { useForm } from "react-hook-form";
import { todoAdded } from "./todosSlice";

export default function TodoForm({ dispatch }) {
  const { register, handleSubmit, reset } = useForm();

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
      <input
        type="text"
        style={{ width: "90vw" }}
        placeholder="할일을 추가하세요"
        {...register("textInput", { required: true })}
      />
      <button type="submit">add</button>
    </form>
  );
}

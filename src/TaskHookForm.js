import React from "react";
import { nanoid } from "nanoid";

import { useForm } from "react-hook-form";

const TaskForm = ({ kisiler, submitFn }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  // task ekleme
  function myNewHandleSubmit(data) {
    console.log(data);
    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak",
    });
    reset();
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(myNewHandleSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          {...register("title", {
            required: "Task başlığı yazmalısınız",
            minLength: {
              value: 3,
              message: "Task başlığı en az 3 karakter olmalı",
            },
          })}
          type="text"
        />
        {errors.title && <p className="input-error">{errors.title?.message}</p>}
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          {...register("description", {
            required: "Task açıklaması yazmalısınız",
            minLength: {
              value: 10,
              message: "Task açıklaması en az 10 karakter olmalı",
            },
          })}
        ></textarea>
        {errors.description && (
          <p className="input-error">{errors.description?.message}</p>
        )}
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                {...register("people", {
                  required: "Lütfen en az bir kişi seçin",
                  validate: (peoList) =>
                    peoList.length <= 3 || "En fazla 3 kişi seçebilirsiniz",
                })}
                value={p}
              />
              {p}
            </label>
          ))}
        </div>
        {errors.people && (
          <p className="input-error">{errors.people?.message}</p>
        )}
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
};
export default TaskForm;

/*

import {useForm} from "react-hook-form"; 
const {register, handleSubmit} = useForm(); tanımladım.
handleSubmit fonks,yonunu myNewHandleSubmit olarak değiştirip <form className="taskForm" onSubmit={handleSubmit(myNewHandleSubmit)}> böyle tanımladım.
namelerin hepsini {...register("sjkjsjvsdkvl")} olarak değiştirdim.
onChange leri silersem bütün YUP akışları dışarıda kalıyor.
onSubmit fonk bi parametre atıyor, istediğini diyebilirsin . o parametre benim bütün datalarımın object tree'si oluyor.
yani benim.
myNewHandleSubmit teki (e) artık bir event değil, aslında bir data.
react-hook kullanınca e.preventDefault a gerek kalmıyor,
onchange den sonra   value={formData.title}    ve    value={formData.description} da sildim. 360 derece bağı kaldırdım. çünkü başlık ve açıklama kısmına yazamıyordum.
checked={formData.people.includes(p)} ve  bunu da sildim. button disabled ı dda şimdilik inaktif ettim.
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    people: [],
  }); buna da ihtiyacım kalmadı artık.
function handleCheckboxChange(e)     ve 
function handleOthersChange(e) alanlarına da ihtiyacım kalmadı. sildim.
formAlaniniKontrolEt(name, value)  sildim.
form alanını kontrol eden useEffect i sildim, form datayı sildim işim kalmadı.

hook bizim için changeHandler ları ve StateHandler ları yazıyor.
hook ta validastion u register ın içine 2. paametre olarak bir obje şeklinde yazıyorum. şağıda da {errors.description && (
<p className="input-error">{errors.description?.message}</p>)} böyle görüntülüyorum.

en son required ın içine validate ekleyerek yup error statelerini kaldırdım.

*/

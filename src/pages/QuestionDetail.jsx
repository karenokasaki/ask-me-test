import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
   CalendarDaysIcon,
   TrashIcon,
   XCircleIcon,
} from "@heroicons/react/24/outline";
import dateFormater from "../utils/dataFormater";

export default function QuestionDetail() {
   const params = useParams();
   const navigate = useNavigate();

   const [question, setQuestion] = useState({});
   const [form, setForm] = useState({
      answer: "",
      user: "",
   });
   //state que vai dar o trigger no useEffect para rodar novamente e pegar as informações atualizadas
   const [reload, setReload] = useState(false);
   const [formEdit, setFormEdit] = useState({
      question: "",
   });
   const [showForm, setShowForm] = useState(false);

   useEffect(() => {
      async function fetchQuestion() {
         const response = await axios.get(
            `https://webdev103.cyclic.app/questions/${params.id}`
         );
         setQuestion(response.data);
         setFormEdit({ question: response.data.question });
      }

      fetchQuestion();
   }, [reload]);

   function handleChange(e) {
      setForm({ ...form, [e.target.name]: e.target.value });
   }

   function handleChangeEdit(e) {
      setFormEdit({ ...formEdit, [e.target.name]: e.target.value });
   }

   async function handleSubmit(e) {
      e.preventDefault();

      try {
         await axios.put(
            `https://webdev103.cyclic.app/questions/${params.id}`,
            { answers: [...question.answers, form] }
         );
         //pedir para o useEffect rodar novamente
         setReload(!reload);
         //deixar o form vazio depois da resposta
         setForm({
            answer: "",
            user: "",
         });
      } catch (error) {
         console.log(error);
      }
   }

   async function handleSubmitEdit(e) {
      e.preventDefault();

      try {
         await axios.put(
            `https://webdev103.cyclic.app/questions/${params.id}`,
            formEdit
         );
         //pedir para o useEffect rodar novamente
         setReload(!reload);
         //deixar o form vazio depois da resposta
         setFormEdit({
            question: "",
         });
         setShowForm(false);
      } catch (error) {
         console.log(error);
      }
   }

   async function handleDelete(e) {
      e.preventDefault();

      try {
         await axios.delete(
            `https://webdev103.cyclic.app/questions/${params.id}`
         );
         navigate("/");
      } catch (error) {
         console.log(error);
      }
   }

   console.log(question);

   return (
      <div className="p-4">
         <h1 className="text-2xl font-bold mb-2">{question.question}</h1>
         <div className="flex justify-between mb-2">
            <p className="">Autor: {question.user}</p>
            <p className="text-xs text-gray-400 flex justify-center items-center gap-2">
               <span className="mt-1">{dateFormater(question.createdAt)}</span>
               <CalendarDaysIcon className="h-6 w-6 " />
            </p>
         </div>

         <div className="border-b-2 border-primary-button mb-4"></div>

         <div>
            {question.answers &&
               question.answers.map((answer) => {
                  return (
                     <div
                        key={answer.answer}
                        className="mb-4 bg-gray-100 p-4 rounded-lg"
                     >
                        <p className="text-gray-800">{answer.answer}</p>
                        <p className="text-gray-500">Dev: {answer.user}</p>
                     </div>
                  );
               })}

            {question.answers && !question.answers.length && (
               <p className="text-gray-400 text-center">
                  Pergunta sem respostas ainda...
               </p>
            )}
         </div>

         <div className="border-b-2 border-primary-button mt-4 mb-4"></div>

         <form className="mb-4">
            <label className="block mb-2 font-bold">Resposta</label>
            <textarea
               className="border border-gray-300 p-2 w-full outline-none resize-none"
               rows={5}
               name="answer"
               value={form.answer}
               onChange={handleChange}
               placeholder="Ajude um dev..."
            />
            <div className="flex justify-center items-center mt-4">
               <input
                  className="border-none w-full h-10 resize-none p-2 shadow focus:outline-none  "
                  type="text"
                  name="user"
                  value={form.user}
                  onChange={handleChange}
                  placeholder="Seu nome..."
               />

               <button
                  onClick={handleSubmit}
                  className="
                     bg-primary-button
                     text-white
                     font-bold
                     py-2
                     px-6
                     tracking-wide
                     flex
                     gap-2
                  "
               >
                  Enviar
               </button>
            </div>
         </form>
         <button
            className="bg-gray-400 text-white font-bold py-2 px-4 rounded mb-4"
            onClick={() => setShowForm(true)}
         >
            Editar pergunta
         </button>

         {showForm && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-200 bg-opacity-40">
               <div className="bg-white p-6 rounded shadow-lg sm:w-1/2">
                  <form>
                     <textarea
                        type="text"
                        name="question"
                        value={formEdit.question}
                        onChange={handleChangeEdit}
                        rows={5}
                        className="border border-gray-300 p-2 w-full outline-none resize-none"
                     />
                     <div className="flex justify-between">
                        <button
                           className="bg-primary-button text-white font-bold py-2 px-4 rounded mb-4"
                           onClick={handleSubmitEdit}
                        >
                           Salvar Alteração
                        </button>
                        <button
                           className="bg-red-400 text-white font-bold py-2 px-4 rounded mb-4  flex justify-center items-center gap-2"
                           onClick={handleDelete}
                        >
                           <TrashIcon className="w-6 h-6" />
                        </button>
                     </div>
                     <button
                        className="bg-gray-200 text-gray-600 font-bold py-1 px-2 rounded flex justify-center items-center gap-2"
                        onClick={() => setShowForm(false)}
                     >
                        <XCircleIcon className="w-8 h-8" /> Cancelar
                     </button>
                  </form>
               </div>
            </div>
         )}
      </div>
   );
}

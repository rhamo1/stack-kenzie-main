import { useToast } from "@chakra-ui/react";
import { createContext, useState, useEffect } from "react";
import { api } from "../../../services/api";
import { useAuth } from "../../hooks";

const AnswerContext = createContext({});

const AnswerProvider = ({ children }) => {
  const toast = useToast();
  const [answers, setAnswers] = useState([]);

  const { accessToken } = useAuth();

  const tokenBearer = { headers: { Authorization: `Bearer ${accessToken}` } };

  useEffect(() => {
    api.get("/answers").then((response) => {
      setAnswers(response.data);
    });
  }, []);

  //Criar uma questão
  const createAnswer = async (data, callback) => {
    api.post("/answers", data, tokenBearer).then(() => {
      callback();
      toast({
        containerStyle: {
          background: "#48BB78",
          color: "whiter",
          borderRadius: "8px",
        },
        title: "Resposta enviada",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    });
  };

  //Pegar todos as resposta
  const getAnswers = async (userId, postId) => {
    if (userId && postId) {
      api.get(`/answers?userId=${userId}&postId=${postId}`).then((response) => {
        setAnswers(response.data); //return response.data
      });
    } else {
      api.get("/answers").then((response) => {
        setAnswers(response.data);
      });
    }
  };

  //deletar uma questão
  const deleteAnswer = async (answerId) => {
    api
      .delete(`/answers/${answerId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(() => {
        toast({
          containerStyle: {
            background: "#E53E3E",
            color: "whiter",
            borderRadius: "8px",
          },
          title: "Resposta deletada!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  return (
    <AnswerContext.Provider
      value={{ answers, setAnswers, createAnswer, getAnswers, deleteAnswer }}
    >
      {children}
    </AnswerContext.Provider>
  );
};

export { AnswerProvider, AnswerContext };

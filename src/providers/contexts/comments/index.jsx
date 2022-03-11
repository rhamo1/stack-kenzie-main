import { useToast } from "@chakra-ui/react";
import { createContext, useState, useEffect } from "react";
import { api } from "../../../services/api";
import { useAuth } from "../../hooks";

const CommentContext = createContext({});

const CommentProvider = ({ children }) => {
  const { accessToken } = useAuth();

  const tokenBearer = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const toast = useToast();

  const [comments, SetComments] = useState([]);

  useEffect(() => {
    api.get("/comments").then((response) => {
      SetComments(response.data);
    });
  }, []);

  //Criar uma questão
  const createComment = async (data, callback) => {
    api.post("/comments", data, tokenBearer).then(() => {
      callback();
      toast({
        containerStyle: {
          background: "#48BB78",
          color: "whiter",
          borderRadius: "8px",
        },
        title: "Comentário adicionado",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    });
  };

  //Pegar todos as questões
  const getAllComments = async () => {
    api.get("/comments").then((response) => {
      SetComments(response.data);
      console.log("todo os comements: ", response.data);
    });
  };

  //deletar uma questão
  const deleteComment = async (commentId) => {
    api
      .delete(`/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(() => {
        toast({
          containerStyle: {
            background: "#E53E3E",
            color: "whiter",
            borderRadius: "8px",
          },
          title: "Comentário deletado!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  return (
    <CommentContext.Provider
      value={{ comments, createComment, getAllComments, deleteComment }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export { CommentProvider, CommentContext };

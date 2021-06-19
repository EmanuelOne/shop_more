import styled from "styled-components";
export const Pagination = styled.div`
  text-align: center;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
export const PageBox = styled.div`
  width: fit-content;
  background-color: ${({ page }) => (page ? "black" : "white")};
  color: ${({ page }) => (page ? "white" : "black")};
  &:hover {
    background-color: ${({ page }) => (!page ? "black" : "white")};
    color: ${({ page }) => (!page ? "white" : "black")};
    transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.3 0.6;
  }
`;

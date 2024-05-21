import styled from "styled-components";

export const Container = styled.div`
  .header {
    height: 40px;
    background: grey;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    color: white;
  }
`;

export const Flow = styled.div`
  display: flex;
  width: 100%;
  height: 91vh;
  .flow {
    width: 72%;
  }
  .setting {
    width: 28%;
    border: 1px solid teal;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .custom-tab {
      margin: 0 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 15px;
    }
    .text {
      p {
        font-size: 18px;
        margin: 0 10px 0 0;
      }
      display: flex;
      align-items: center;
    }
    input {
      height: 30px;
      border-radius: 5px;
      font-size: 16px;
      padding: 0 5px;
    }
    .add-node {
      margin: 0 20px;
      width: 100%;
      margin: auto;
      margin-bottom: 20px;
    }
  }
`;

export const StyledButton = styled.button`
  padding: 10px;
  background: teal;
  border-radius: 10px;
  border: none;
  min-width: 100px;
  color: white;
  cursor: pointer;
  font-size: 16px;
`;

interface NodeProps {
  isSelected: boolean;
}

export const StyledNode = styled.div<NodeProps>`
  border-radius: 12px;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  border: ${(props) => (props.isSelected ? "2px solid orange" : "")};
  .node-header {
    p {
      margin: 0;
    }
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px 10px 0 0;
    width: 200px;
    color: white;
    padding: 0 10px;
    background: teal;
  }
  .data {
    padding: 0 10px;
    height: 50px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    background: white;
    width: 200px;
  }
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  textarea {
    width: 100%;
    min-height: 100px;
    font-size: 16px;
    padding: 5px;
  }
`;

export const TabContainer = styled.div`
  display: grid;

  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 10px;

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;
    border: 1px solid teal;
    padding: 20px;
    cursor: pointer;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);

    p {
      margin: 0;
    }
    border-radius: 10px;
    color: teal;
  }
`;

export const TabHeader = styled.div`
  border: 1px solid teal;
  padding: 15px 5px;
  display: flex;
  justify-content: space-between;
  svg {
    cursor: pointer;
  }
  p {
    margin: 0;
  }
`;

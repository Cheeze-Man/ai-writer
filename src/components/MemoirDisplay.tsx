import styled from "styled-components";
import { Image } from "antd";
import {
  CheckCircleTwoTone,
  HeartTwoTone,
  LoadingOutlined,
  MessageTwoTone,
  SmileTwoTone,
  SoundTwoTone,
} from "@ant-design/icons";
import {
  ActionListItem,
  CardContainer,
  CardContent,
  CardTitle,
  Divider,
  MemoirContainer,
  ResultTitle,
} from "./CommonStyles";

type DataObject = {
  title: string;
  thumbnail: string;
  summary: string;
  emotional_result: string;
  emotional_content: string;
  analysis: string;
  action_list: string[];
};

type Props = {
  data?: DataObject;
  isLoading: boolean;
};

const ThumbnailImage = styled(Image)`
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const MemoirDisplay = ({ data, isLoading }: Props) => {
  return (
    <MemoirContainer>
      {isLoading && (
        <LoadingContainer>
          Memoir AI가 글을 작성 중입니다...
          <LoadingOutlined />
        </LoadingContainer>
      )}
      {data?.title !== "" && !isLoading && (
        <>
          <ResultTitle>{data?.title}</ResultTitle>

          <Divider />
          <CardContainer>
            <CardTitle>
              <CheckCircleTwoTone
                twoToneColor="#52c41a"
                style={{ marginRight: "6px" }}
              />
              요약
            </CardTitle>
            <CardContent>{data?.summary}</CardContent>
          </CardContainer>

          {data?.thumbnail && (
            <ThumbnailImage src={data?.thumbnail} alt="Thumbnail" />
          )}

          <Divider />
          <CardContainer>
            <CardTitle>
              <HeartTwoTone
                twoToneColor="#f43f5e"
                style={{ marginRight: "6px" }}
              />
              회고
            </CardTitle>
            <CardContent>{data?.emotional_content}</CardContent>
          </CardContainer>

          <Divider />
          <CardContainer>
            <CardTitle>
              <SmileTwoTone
                twoToneColor="#f59e0b"
                style={{ marginRight: "6px" }}
              />
              내 감정
            </CardTitle>
            <CardContent>{data?.emotional_result}</CardContent>
          </CardContainer>

          <Divider />
          <CardContainer>
            <CardTitle>
              <MessageTwoTone
                twoToneColor={"#0284c7"}
                style={{ marginRight: "6px" }}
              />
              심리 분석
            </CardTitle>
            <CardContent>{data?.analysis}</CardContent>
          </CardContainer>

          <Divider />
          <CardContainer>
            <CardTitle>
              <SoundTwoTone
                twoToneColor="#7c3aed"
                style={{ marginRight: "6px" }}
              />
              Memoir AI 의 조언
            </CardTitle>
            <CardContent>
              {data?.action_list.map((action: string, index: number) => (
                <ActionListItem key={index}>{action}</ActionListItem>
              ))}
            </CardContent>
          </CardContainer>
        </>
      )}
    </MemoirContainer>
  );
};

export default MemoirDisplay;

const LoadingContainer = styled.div`
  width: 100%;
  margin: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  letter-spacing: -0.5px;
  color: #3f3f46;
  font-weight: 600;
`;

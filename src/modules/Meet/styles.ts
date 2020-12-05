import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

interface CardTableColumnProps {
  flex?: number;
}

export const Container = styled.ScrollView`
  padding-right: 25px;
  padding-left: 25px;
  padding-top: ${(Platform.OS === 'ios' ? getStatusBarHeight() : 0) + 40}px;
  padding-bottom: 50px;
  background-color: #222533;
`;

export const HeaderView = styled.View`
  padding-bottom: 20px;
  width: 100%;
`;

export const HelloText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 28px;
`;

export const Card = styled.View`
  background-color: #2d3146;
  width: 100%;
  padding: 20px 25px;
  border-radius: 8px;
  align-items: flex-start;
  margin: 10px 0 20px;
`;

export const CardFooter = styled.View`
  flex-direction: row;
  margin-top: 15px;
`;

export const Space = styled.View`
  width: 10px;
`;

export const CardTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

export const CardTable = styled.View`
  margin-top: 15px;
`;

export const CardTableHeader = styled.View`
  width: 100%;
  flex-direction: row;
`;

export const CardTableColumn = styled.View<CardTableColumnProps>`
  flex: ${({ flex }) => flex ?? 1};
  justify-content: center;
  align-items: center;
`;

export const CardTableHeaderTitle = styled.Text`
  color: white;
  text-align: left;
  width: 100%;
`;

export const CardTableSection = styled.View`
  width: 100%;
  flex-direction: column;
  margin-top: 15px;
`;

export const CardTableLine = styled.View`
  flex-direction: row;
  width: 100%;
  border-top-width: 1px;
  border-top-color: #ffffff33;
  border-bottom-width: 1px;
  border-bottom-color: #ffffff33;
  padding: 8px 0%;
`;

export const CardTableSectionName = styled.View`
  width: 100%;
`;

export const CardTableSectionText = styled.Text`
  color: white;
  font-weight: bold;
  width: 100%;
`;

export const CardTableSectionDescription = styled.Text`
  color: white;
  width: 100%;
`;

export const CardTableSectionScore = styled.View`
  width: 100%;
  background-color: green;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  border-radius: 5px;
`;

export const CardTableSectionScoreText = styled.Text`
  background-color: green;
  flex-direction: row;
  color: white;
  font-weight: bold;
`;

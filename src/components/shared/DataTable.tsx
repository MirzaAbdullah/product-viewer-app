import * as React from "react";

import { Badge, Stack } from "@react-native-material/core";
import { DataTable as NativePaperDataTable } from "react-native-paper";
import { Text, TouchableOpacity, View } from "react-native";
import { ActivityLoader } from "./activityLoader";
import { Avatar } from "react-native-paper";
import { checkIsDate, formatDate } from "../../utils/formatDate";

interface Props {
  dataKey: string;
  headers: Array<string>;
  itemsPerPage?: number;
  rows: Array<string>;
  data: Array<any>;
  rowsWidth: Array<number>;
  headerTextCSS?: any;
  isIconRequired?: boolean;
  iconColumnIndex?: number;
  rawIcon?: React.ReactNode | string;
  isDataLoaded: boolean;
  handleOnRowClick: (id: string) => void;
}

const formatCells = (value: any): any => {
  //Thousand separator
  if (typeof value === "number") {
    return value.toLocaleString();
  }

  //Format the date
  if (checkIsDate(value)) {
    return formatDate(value);
  }

  //'N/A' for the empty cells
  if (value === "") {
    return "N/A";
  }

  return value;
};

const conditionalCell = (column: string, value: any) => {
  switch (column) {
    case "image":
    case "Image":
      return (
        <View style={{ marginBottom: "10%" }}>
          <Avatar.Image
            source={{ uri: value }}
            style={{ width: 50, height: 50 }}
          />
        </View>
      );
      break;
    default:
      return (
        <View style={{ flexDirection: "row" }}>
          <Text lineBreakMode="middle">{formatCells(value)}</Text>
        </View>
      );
      break;
  }
};

export const DataTable: React.FC<Props> = ({
  dataKey,
  headers = [],
  rows = [],
  data = [],
  itemsPerPage = 10,
  rowsWidth = [],
  isIconRequired = false,
  iconColumnIndex = 0,
  headerTextCSS = {},
  rawIcon = "",
  isDataLoaded,
  handleOnRowClick,
}: Props) => {
  const [page, setPage] = React.useState<number>(0);

  const fromPage = (
    page: number,
    itemPerPage: number,
    rows: any[] | undefined
  ) => {
    return page * itemPerPage + itemPerPage > (rows || []).length
      ? (rows || []).length
      : page * itemPerPage + itemPerPage;
  };

  return data.length > 0 ? (
    <NativePaperDataTable>
      <NativePaperDataTable.Header>
        {headers.map((element, index) => {
          return (
            <NativePaperDataTable.Title
              style={{ width: rowsWidth[index] }}
              key={index}
            >
              <Text style={{ ...headerTextCSS }}>{element}</Text>
            </NativePaperDataTable.Title>
          );
        })}
      </NativePaperDataTable.Header>

      {data
        .slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)
        .map((dataElement, dataIndex) => {
          return (
            <NativePaperDataTable.Row key={dataIndex}>
              {rows.map((rowElement, rowIndex) => {
                return (
                  <TouchableOpacity
                    key={`${dataIndex}-${rowIndex}`}
                    onPress={() =>
                      !isIconRequired
                        ? handleOnRowClick(dataElement[dataKey])
                        : {}
                    }
                  >
                    <NativePaperDataTable.Cell
                      key={rowIndex}
                      style={{
                        width: rowsWidth[rowIndex],
                        justifyContent: "center",
                      }}
                    >
                      {isIconRequired && rowIndex === iconColumnIndex && (
                        <TouchableOpacity
                          onPress={() =>
                            handleOnRowClick(dataElement[rowElement])
                          }
                        >
                          {rawIcon}
                        </TouchableOpacity>
                      )}
                      &nbsp;
                      {conditionalCell(rowElement, dataElement[rowElement])}
                    </NativePaperDataTable.Cell>
                  </TouchableOpacity>
                );
              })}
            </NativePaperDataTable.Row>
          );
        })}

      <NativePaperDataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(data.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${fromPage(page, itemsPerPage, data)} of ${data.length}`}
        numberOfItemsPerPage={itemsPerPage}
        selectPageDropdownLabel={"Rows per page"}
      />
    </NativePaperDataTable>
  ) : !isDataLoaded ? (
    <ActivityLoader />
  ) : (
    <Stack fill center spacing={4} style={{ marginLeft: 120, marginTop: 10 }}>
      <Badge label="No Data Available" color="papayawhip" />
    </Stack>
  );
};

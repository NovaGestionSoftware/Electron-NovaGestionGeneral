import { TablaDefault } from "@renderer/frontend-resources/components";
import { ColumnDef } from "@renderer/frontend-resources/components/Tables/TableUtils";

import { useState } from "react";

export default function DetalleProgramaTabla() {
  const columns: ColumnDef<any>[] = [
    { key: "id", label: "", renderCell: () => null, minWidth: "0", maxWidth: "0" },
    {
      key: "select",
      label: " ",
      renderCell: (item) => (
        <div className="flex justify-center items-center">
          {" "}
          <input type="checkbox" checked={item.v === 0} readOnly />
        </div>
      ),
      minWidth: "40",
      maxWidth: "40",
      resaltar: true,
    },
    { key: "detalle", label: "Detalle de Programas", minWidth: "200", maxWidth: "200" },

    {
      key: "a",
      label: "A",
      renderCell: (item) => (
        <div className="flex justify-center items-center">
          {" "}
          <input type="checkbox" checked={item.v === 0} readOnly />
        </div>
      ),
      minWidth: "40",
      maxWidth: "40",
      resaltar: true,
    },
    {
      key: "m",
      label: "M",
      renderCell: (item) => (
        <div className="flex justify-center items-center">
          {" "}
          <input type="checkbox" checked={item.v === 0} readOnly />
        </div>
      ),
      minWidth: "40",
      maxWidth: "40",
      resaltar: true,
    },
    {
      key: "b",
      label: "B",
      renderCell: (item) => (
        <div className="flex justify-center items-center">
          {" "}
          <input type="checkbox" checked={item.v === 0} readOnly />
        </div>
      ),
      minWidth: "40",
      maxWidth: "40",
      resaltar: true,
    },
    {
      key: "q",
      label: "Q",
      renderCell: (item) => (
        <div className="flex justify-center items-center">
          {" "}
          <input type="checkbox" checked={item.v === 0} readOnly />
        </div>
      ),
      minWidth: "40",
      maxWidth: "40",
      resaltar: true,
    },
    {
      key: "t",
      label: "T",
      renderCell: (item) => (
        <div className="flex justify-center items-center">
          {" "}
          <input type="checkbox" checked={item.v === 0} readOnly />
        </div>
      ),
      minWidth: "40",
      maxWidth: "40",
      resaltar: true,
    },
    {
      key: "c",
      label: "C",
      renderCell: (item) => (
        <div className="flex justify-center items-center">
          {" "}
          <input type="checkbox" checked={item.v === 0} readOnly />
        </div>
      ),
      minWidth: "40",
      maxWidth: "40",
      resaltar: true,
    },
    {
      key: "i",
      label: "I",
      renderCell: (item) => (
        <div className="flex justify-center items-center">
          {" "}
          <input type="checkbox" checked={item.v === 0} readOnly />
        </div>
      ),
      minWidth: "40",
      maxWidth: "40",
      resaltar: true,
    },
    {
      key: "e",
      label: "E",
      renderCell: (item) => (
        <div className="flex justify-center items-center">
          {" "}
          <input type="checkbox" checked={item.v === 0} readOnly />
        </div>
      ),
      minWidth: "40",
      maxWidth: "40",
      resaltar: true,
    },
    {
      key: "p",
      label: "P",
      renderCell: (item) => (
        <div className="flex justify-center items-center">
          {" "}
          <input type="checkbox" checked={item.v === 0} readOnly />
        </div>
      ),
      minWidth: "40",
      maxWidth: "40",
      resaltar: true,
    },
    {
      key: "n",
      label: "N",
      renderCell: (item) => (
        <div className="flex justify-center items-center">
          {" "}
          <input type="checkbox" checked={item.v === 0} readOnly />
        </div>
      ),
      minWidth: "40",
      maxWidth: "40",
      resaltar: true,
    },
  ] as const;

  const datosParaTabla = [
    {
      id: "1",
      detalle: "Principal",
      cuota: "",
      porcentaje: "20.00",
      a: true,
      m: true,
      b: true,
      q: true,
      t: true,
      c: true,
      i: true,
      e: true,
      p: true,
      n: true,
    },
  ];
  const props = {
    datosParaTabla: datosParaTabla,
    objectColumns: columns,
    selectFn: true,
    estaProcesado: true,
    status: "pending",
    objectStyles: {
      heightContainer: "25.5rem",
      viewport1440: {
        heightContainer1440px: "25.5rem",
      },
      viewport1536: {
        heightContainer1536px: "25.5rem",
      },
      viewport1920: {
        heightContainer1920px: "25.5rem",
      },
      widthContainer: "100%",
    },
  };

  return (
    <div className="w-fit overflow-hidden">
      <TablaDefault props={props} />
    </div>
  );
}

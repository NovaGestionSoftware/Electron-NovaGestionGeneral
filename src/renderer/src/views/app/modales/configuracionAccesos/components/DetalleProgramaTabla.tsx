import { TablaDefault } from "@renderer/frontend-resources/components";
import { ColumnDef } from "@renderer/frontend-resources/components/Tables/TableUtils";
import { useState, useMemo } from "react";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";

export default function DetalleProgramaTabla() {
  // Estado para secciones expandidas
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const toggleSection = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Datos crudos anidados bajo 'principal'
  const datosRaw = {
    principal: {
      usuarios: {
        usuarios: { a: true, m: true, b: true, i: true, e: true },
        categorias: { a: true, m: true, b: true, i: true, e: true },
        cambioPassword: {},
      },
      atributos: {
        configuracionUsuarios: { m: true },
        configuracionCategorias: { m: true },
        enviarUsuariosSucursales: {},
      },
      empresas: {
        empresas: { a: true, m: true, b: true, i: true, e: true },
        nodos: { a: true, m: true, b: true, i: true, e: true },
      },
      mantenimiento: {
        RespaldarBaseDeDatos: {},
      },
    },
  };

  // Flatten de datos según secciones expandidas, incluyendo permisos
  const datosParaTabla = useMemo(() => {
    const list: any[] = [];
    // Fila principal
    list.push({ id: "principal", detalle: "principal", isSection: true });
    if (expanded["principal"]) {
      Object.entries(datosRaw.principal).forEach(([sectionKey, children]) => {
        // fila de sección
        list.push({ id: sectionKey, detalle: sectionKey, isSection: true, parent: "principal" });
        if (expanded[sectionKey]) {
          // hijos de cada sección
          Object.entries(children).forEach(([childKey, perms]) => {
            list.push({
              id: `${sectionKey}-${childKey}`,
              detalle: childKey,
              isSection: false,
              parent: sectionKey,
              permissions: perms,
            });
          });
        }
      });
    }
    return list;
  }, [expanded]);

  // Definición de columnas, con renderCell personalizado para expand/collapse y permisos
  const columns: ColumnDef<any>[] = [
    { key: "id", label: "", renderCell: () => null, minWidth: "0", maxWidth: "0" },
    { key: "select", label: " ", renderCell: () => null, minWidth: "40", maxWidth: "40" },
    {
      key: "detalle",
      label: "Detalle de Programas",
      minWidth: "250",
      maxWidth: "250",
      renderCell: (item) => {
        const level = item.parent ? (item.isSection ? 1 : 2) : 0;
        return (
          <div
            className={`flex items-center cursor-pointer ${level === 1 ? "pl-4" : level === 2 ? "pl-8" : ""}`}
            onClick={() => item.isSection && toggleSection(item.id)}
          >
            {item.isSection && (
              <span className="mr-2 select-none">
                {expanded[item.id] ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
              </span>
            )}
            <span className={item.isSection ? "font-semibold" : ""}>{item.detalle}</span>
          </div>
        );
      },
    },
    // Columnas de permisos solo para hijos (nivel 2)
    {
      key: "a",
      label: "A",
      minWidth: "40",
      maxWidth: "40",
      renderCell: (item) =>
        item.isSection ? null : <input type="checkbox" checked={!!item.permissions?.a} readOnly />,
    },
    {
      key: "m",
      label: "M",
      minWidth: "40",
      maxWidth: "40",
      renderCell: (item) =>
        item.isSection ? null : <input type="checkbox" checked={!!item.permissions?.m} readOnly />,
    },
    {
      key: "b",
      label: "B",
      minWidth: "40",
      maxWidth: "40",
      renderCell: (item) =>
        item.isSection ? null : <input type="checkbox" checked={!!item.permissions?.b} readOnly />,
    },
    {
      key: "q",
      label: "Q",
      minWidth: "40",
      maxWidth: "40",
      renderCell: (item) =>
        item.isSection ? null : <input type="checkbox" checked={!!item.permissions?.q} readOnly />,
    },
    {
      key: "t",
      label: "T",
      minWidth: "40",
      maxWidth: "40",
      renderCell: (item) =>
        item.isSection ? null : <input type="checkbox" checked={!!item.permissions?.t} readOnly />,
    },
    {
      key: "c",
      label: "C",
      minWidth: "40",
      maxWidth: "40",
      renderCell: (item) =>
        item.isSection ? null : <input type="checkbox" checked={!!item.permissions?.c} readOnly />,
    },
    {
      key: "i",
      label: "I",
      minWidth: "40",
      maxWidth: "40",
      renderCell: (item) =>
        item.isSection ? null : <input type="checkbox" checked={!!item.permissions?.i} readOnly />,
    },
    {
      key: "e",
      label: "E",
      minWidth: "40",
      maxWidth: "40",
      renderCell: (item) =>
        item.isSection ? null : <input type="checkbox" checked={!!item.permissions?.e} readOnly />,
    },
    {
      key: "p",
      label: "P",
      minWidth: "40",
      maxWidth: "40",
      renderCell: (item) =>
        item.isSection ? null : <input type="checkbox" checked={!!item.permissions?.p} readOnly />,
    },
    {
      key: "n",
      label: "N",
      minWidth: "40",
      maxWidth: "40",
      renderCell: (item) =>
        item.isSection ? null : <input type="checkbox" checked={!!item.permissions?.n} readOnly />,
    },
  ] as const;

  const props = {
    datosParaTabla,
    objectColumns: columns,
    selectFn: false,
    estaProcesado: true,
    status: "idle",
    objectStyles: {
      heightContainer: "25.5rem",
      widthContainer: "100%",
      viewport1440: { heightContainer1440px: "25.5rem" },
      viewport1536: { heightContainer1536px: "25.5rem" },
      viewport1920: { heightContainer1920px: "25.5rem" },
    },
  };

  return (
    <div className="w-fit overflow-hidden">
      <TablaDefault props={props} />
    </div>
  );
}

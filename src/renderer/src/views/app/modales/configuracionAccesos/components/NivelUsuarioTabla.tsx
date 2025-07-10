import { TablaDefault } from "@renderer/frontend-resources/components";
import { ColumnDef } from "@renderer/frontend-resources/electron/utils/table";

interface Item {
  id?: number | string;
  IDTIPO: string;
  NOMBRE: string;
  [key: string]: any;
}

export default function NivelUsuarioTabla({ setNivelUsuarioSeleccionado, nivelUsuarioSeleccionado }) {
  // const [tipoSelect, setTipoSelect] = useState(false);
  //const [data, setData] = useState<Item[]>([]);

  //   const { dataTipoTabla, setTipoSucTabla, tipoSelecionado, setTipoSelecionado } = storeData;

  const columns: ColumnDef<any>[] = [
    { key: "id", label: "", renderCell: () => null, minWidth: "0", maxWidth: "0" },
    { key: "codigo", label: "Código", minWidth: "100", maxWidth: "100" },
    { key: "descripcion", label: "Descripción", minWidth: "150", maxWidth: "180" },
  ] as const;

  const datosParaTabla = [
    {
      id: "1",
      codigo: "0001",
      descripcion: "Supervisor",
    },
  ];

  const props = {
    datosParaTabla: datosParaTabla ? datosParaTabla : [],
    objectColumns: columns,
    selectFn: true,
    estaProcesado: true,
    status: "pending",
    objectStyles: {
      heightContainer: "18.5rem",
      viewport1440: {
        heightContainer1440px: "18.5rem",
      },
      viewport1536: {
        heightContainer1536px: "18.5rem",
      },
    },
    objectSelection: {
      seleccionado: nivelUsuarioSeleccionado,
      setSeleccionado: setNivelUsuarioSeleccionado,
    },
  };
  return (
    <div className="w-fit overflow-hidden space-x-2">
      <TablaDefault props={props} />
    </div>
  );
}

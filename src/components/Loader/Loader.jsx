import { Dna } from "react-loader-spinner";
import CircularProgress from "@mui/material/CircularProgress";

function Loader() {
  return (
    <Dna
      visible={true}
      height="80"
      width="80"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />
  );
}

export function CircularUnderLoad() {
  return <CircularProgress disableShrink />;
}

export default Loader;

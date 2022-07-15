import SyncLoader from "react-spinners/SyncLoader";

const css = {
    display: "block",
    margin: "0 auto"
};

export default function Spinner({size}) {
   return (
    <SyncLoader 
      color='#FFFFFF'
      //loading={isLoading}
      cssOverride={css}
      size={size}
    />
   );
}
import { ethers } from "ethers";
import ABI from "./abi.json";


    export const getContract = (providerOrSigner:any) =>
    new ethers.Contract(
        "0x50139d921E6746C628dB7AbEc73060e8DA70afad",
        ABI,
        providerOrSigner
    );
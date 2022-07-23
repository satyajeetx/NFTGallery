
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from "@fortawesome/free-solid-svg-icons";

export const NFTCard = ({nft}) => {
    return (
        <div className="w-1/4 flex flex-col ">
            <div className="rounded-md">
                <img className="object-cover h-128 w-full rounded-t-md" src={nft.media[0].gateway} ></img>
            </div>
            <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110">
                <div className="">
                    <h2 className="text-xl text-gray-800">{nft.title}</h2>
                    <p className="text-gray-600">Id: {nft.id.tokenId.substr(0,5)}...{nft.id.tokenId.substr(nft.id.tokenId.length-4,nft.id.tokenId.length)}</p>
                    <p className="text-gray-600">{nft.contract.address.substr(0,5)}...{nft.contract.address.substr(nft.contract.address.length-4,nft.contract.address.length)}  <button onClick={() => {navigator.clipboard.writeText(nft.contract.address)}}>  <FontAwesomeIcon icon={faCopy} /></button></p>
                </div>
                <div className="flex-grow mt-2">
                    <p className="text-gray-600">{nft.description.length>40? nft.description.substr(0,50) + "..." :nft.description}</p>
                </div>
            </div>
        </div> 
    )
}
export default NFTCard;

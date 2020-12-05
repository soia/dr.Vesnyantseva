import axios from 'axios';
import { Authorization, Language } from '../helpers/request-header';

export default class GetService {
    getResource = async url => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}${url}`, {
            headers: {
                Authorization,
                language: Language(),
            },
        });

        if (response.status !== 200) {
            throw new Error(
                `Could not fetch ${process.env.REACT_APP_API_URL}${url},
                received ${response.status}`,
            );
        }
        return response.data;
    };

    logout = () => {
        localStorage.removeItem('user');
        document.location.reload(true);
    };

    // DONE
    getMainPageInfo = async () => {
        const res = await this.getResource('/btcu/getMainPageInfo');
        return res;
    };

    // DONE
    getLatestBlocks = async () => {
        const res = await this.getResource('/btcu/getlatestblocks');
        return res;
    };

    // DONE
    getLatestTransactions = async () => {
        const res = await this.getResource('/btcu/getlatesttransactions');
        return res;
    };

    // DONE
    getSearchQuery = async searchQuery => {
        const res = await this.getResource(`/btcu/${searchQuery}`);
        return res;
    };

    // DONE
    getBlockByIndex = async index => {
        const res = await this.getResource(`/btcu/getBlockByIndex/${index}`);
        return res;
    };

    // DONE
    getTransactionInfo = async hash => {
        const res = await this.getResource(`/btcu/gettransactioninfo/${hash}`);
        return res;
    };

    // DONE
    getAddressInfo = async address => {
        const res = await this.getResource(`/btcu/getaddressinfo/${address}`);
        return res;
    };

    // DONE
    getBlockByHash = async hash => {
        const res = await this.getResource(`/btcu/getblockbyhash/${hash}`);
        return res;
    };

    // DONE
    getAllTransactions = async (itemsPerPage, pageNumber) => {
        const res = await this.getResource(
            `/btcu/getpaginatedtransactions/${itemsPerPage}/${pageNumber}`,
        );
        return res;
    };

    // DONE
    getAllBlocks = async (itemsPerPage, pageNumber) => {
        const res = await this.getResource(
            `/btcu/getpaginatedblocks/${itemsPerPage}/${pageNumber}`,
        );
        return res;
    };

    // DONE
    getTransactionsByAddress = async (itemsPerPage, pageNumber, address) => {
        const res = await this.getResource(
            `/btcu/getpaginatedtransactionsbyaddress/${itemsPerPage}/${pageNumber}/${address}`,
        );
        return res;
    };

    // DONE
    getTransactionsByBlock = async (itemsPerPage, pageNumber, blockId) => {
        const res = await this.getResource(
            `/btcu/getpaginatedtransactionsbyblock/${itemsPerPage}/${pageNumber}/${blockId}`,
        );
        return res;
    };

    // DONE
    getAddressChart = async address => {
        const res = await this.getResource(`/btcu/getaddresschart/${address}`);
        return res;
    };

    // DONE
    getRichList = async (itemsPerPage, pageNumber) => {
        const res = await this.getResource(
            `/btcu/getpaginatedrichlist/${itemsPerPage}/${pageNumber}`,
        );
        return res;
    };

    getLatestSingleBlock = async () => {
        const res = await this.getResource('/btcu/getsinglelatestblock');
        return res;
    };
}

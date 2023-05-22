// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

struct PriceInfo {
    uint256 price;
    uint256 conf;
}

contract PriceFeedExt {
    address public gov;

    uint8 public decimals = 8;
    string public description;

    address public tokenAddress;
    address public pairAddress;
    address public wethAddress;

    AggregatorV3Interface internal ethPriceFeed;

    modifier onlyGov() {
        require(msg.sender == gov, "Not Governor");
        _;
    }

    constructor(string memory _description, uint8 _decimals) {
        gov = msg.sender;

        description = _description;
        decimals = _decimals;
    }

    function initialize(
        address _token,
        address _pair,
        address _ethPriceFeed,
        address _weth
    ) external onlyGov {
        tokenAddress = _token;
        pairAddress = _pair;
        wethAddress = _weth;

        ethPriceFeed = AggregatorV3Interface(_ethPriceFeed);
    }

    function getETHPrice() public view returns (int256) {
        (, int256 price, , , ) = ethPriceFeed.latestRoundData();

        return price;
    }

    function latestAnswer() external view returns (PriceInfo memory priceInfo) {
        int256 _ethPrice = getETHPrice();
        uint256 ethPrice = uint256(_ethPrice);

        uint256 tokenAmount = ERC20(tokenAddress).balanceOf(pairAddress);
        uint8 tokenDecimal = ERC20(tokenAddress).decimals();
        uint256 wethAmount = ERC20(wethAddress).balanceOf(pairAddress);

        uint8 ethDecimal = ethPriceFeed.decimals();

        uint256 price = ((wethAmount / 1e18) *
            (ethPrice / (10 ** ethDecimal)) *
            (10 ** decimals)) / (tokenAmount / (10 ** tokenDecimal));

        priceInfo.price = price;
        priceInfo.conf = price / 5000;
    }

    function setGov(address newGov) external onlyGov {
        require(gov != newGov, "Already Set");
        gov = newGov;
    }

    function setDescription(string calldata newDescription) external onlyGov {
        description = newDescription;
    }

    function setDecimals(uint8 newDecimals) external onlyGov {
        require(decimals != newDecimals, "Already Set");
        decimals = newDecimals;
    }

    function setTokenAddress(address _token) external onlyGov {
        tokenAddress = _token;
    }

    function setPairAddress(address _pair) external onlyGov {
        pairAddress = _pair;
    }

    function setEthAddress(address _weth) external onlyGov {
        wethAddress = _weth;
    }

    function setEthPriceFeed(address _ethPriceFeed) external onlyGov {
        ethPriceFeed = AggregatorV3Interface(_ethPriceFeed);
    }
}

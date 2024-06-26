// SPDX-License-Identifier: GPL-2.0-or-later

pragma solidity ^0.8.0;

interface IOwnable {
    function transferOwnership(address newOwner) external;
}

interface IOwnableSet {
    function setOwner(address newOwner) external;
}

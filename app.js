// --- Blockchain Consensus Explorer Data Model ---

const consensusData = {
    pow: {
        id: "pow",
        name: "Proof of Work",
        icon: "cpu",
        short_desc: "The pioneer mechanism of crypto. Solves computing puzzles to establish trust.",
        description: "Proof of Work (PoW) is the original consensus protocol popularized by Bitcoin. It requires participants (miners) to expend computational power solving complex, one-way cryptographic mathematical puzzles. The difficulty of these puzzles adjusts dynamically to keep block intervals stable. PoW offers extreme security and decentralization, but is limited by heavy energy expenditure and low transaction throughput.",
        trilemma: { decentralization: 9, security: 10, scalability: 2 },
        trilemma_notes: {
            decentralization: "Highly decentralized. Anyone with hardware can mine, although industrial mining farms and ASIC pools have led to hash rate concentration.",
            security: "Maximum security. The 51% attack threshold is prohibitively expensive to mount against established networks like Bitcoin, requiring billions in energy and ASICs.",
            scalability: "Extremely low scalability. Transactions per second (TPS) are severely limited (~7 for Bitcoin), and block finality is slow and probabilistic."
        },
        steps: [
            { num: "01", title: "Broadcast", desc: "Transactions are grouped together by nodes and placed into the mempool." },
            { num: "02", title: "Compute Puzzle", desc: "Miners compete globally to find a nonce value that creates a block hash below the network's target difficulty." },
            { num: "03", title: "Block Proposal", desc: "The first miner to find the correct nonce broadcasts their proposed block to the peer network." },
            { num: "04", title: "Attestation & Append", desc: "Nodes verify the hash work instantly. The new block is appended, and the miner receives a block reward." }
        ],
        blockchains: [
            { name: "Bitcoin", symbol: "BTC", layer: "Layer 1", desc: "Used to secure the original peer-to-peer electronic cash system. Valued for total decentralization and censorship resistance.", link: "https://bitcoin.org" },
            { name: "Litecoin", symbol: "LTC", layer: "Layer 1", desc: "Modified Bitcoin's code to use the Scrypt algorithm, offering faster block generation times of 2.5 minutes.", link: "https://litecoin.org" },
            { name: "Monero", symbol: "XMR", layer: "Layer 1", desc: "Runs the RandomX mining protocol to block ASICs, keeping mining profitable on everyday consumer CPU hardware.", link: "https://getmonero.org" }
        ],
        languages: [
            { name: "Bitcoin Script", chains: "Bitcoin, Litecoin", desc: "A simple, stack-based language. It is intentionally not Turing-complete to prevent infinite loops and maintain high network security." },
            { name: "C++", chains: "Core Daemons", desc: "Bitcoin's reference client is written in C++ to achieve rapid network socket polling and deterministic memory management." }
        ]
    },
    pos: {
        id: "pos",
        name: "Proof of Stake",
        icon: "coins",
        short_desc: "Stakes native tokens as collateral to secure the network. Energy-efficient.",
        description: "Proof of Stake (PoS) was designed to solve the high energy consumption and transaction latency of PoW. Instead of mining, validators lock up ('stake') their native cryptocurrency as collateral. The protocol selects validators to propose and vote on blocks based on their staked amount. Malicious actions or downtime lead to financial penalties, where staked coins are permanently burned ('slashed').",
        trilemma: { decentralization: 7, security: 8, scalability: 6 },
        trilemma_notes: {
            decentralization: "Moderate. Does not require hardware, but staking pools and high minimum stake sizes (e.g., 32 ETH) can result in capital concentration.",
            security: "Very strong. Security is maintained through economic penalties (slashing). An attacker must acquire and risk 51% of all staked tokens, destroying their own asset value.",
            scalability: "Moderate-high. Block times are pre-allocated (slots), allowing quicker execution, though it is still bottlenecked by the time needed to collect network-wide attestations."
        },
        steps: [
            { num: "01", title: "Validator Deposit", desc: "Participants deposit and lock up a threshold of native tokens into a staking smart contract." },
            { num: "02", title: "Dynamic Selection", desc: "The network selects a validator to propose a block, with probability proportional to their total staked capital." },
            { num: "03", title: "Attestation Phase", desc: "A randomly selected committee of validators inspects the block and signs their approval." },
            { num: "04", title: "Finality & Slashing", desc: "Once a supermajority attestation is verified, the block is finalized. Malicious nodes have their stake slashed." }
        ],
        blockchains: [
            { name: "Ethereum", symbol: "ETH", layer: "Layer 1", desc: "Successfully transitioned from PoW to PoS in 2022 ('The Merge'), cutting energy usage by 99.9% and establishing a global settlement foundation.", link: "https://ethereum.org" },
            { name: "Cardano", symbol: "ADA", layer: "Layer 1", desc: "Uses the Ouroboros consensus protocol. Focuses on peer-reviewed security, non-custodial staking, and no harsh slashing penalties.", link: "https://cardano.org" },
            { name: "Polkadot", symbol: "DOT", layer: "Layer 0", desc: "Employs Nominated Proof of Stake (NPoS) where token holders ('nominators') back a trusted group of active validators.", link: "https://polkadot.network" }
        ],
        languages: [
            { name: "Solidity", chains: "Ethereum", desc: "A contract-oriented, high-level language with syntax similar to JavaScript, compiling to EVM bytecode." },
            { name: "Plutus / Haskell", chains: "Cardano", desc: "A functional programming model based on Haskell, providing high security and mathematically verified smart contracts." },
            { name: "Rust / Substrate", chains: "Polkadot", desc: "Enables compile-time safety and high performance for writing customized parachain consensus modules." }
        ]
    },
    dpos: {
        id: "dpos",
        name: "Delegated Proof of Stake",
        icon: "users",
        short_desc: "Electoral system where coin holders elect delegates to run blocks on their behalf.",
        description: "Delegated Proof of Stake (DPoS) operates as a representative democracy. Rather than all stakers validating blocks, token holders use their balances to vote for a fixed, limited number of delegates (often 21 to 101). These elected delegates alone are responsible for proposing and validating blocks. DPoS provides blazing-fast transaction finality and scalability by reducing the node consensus group, but sacrifices decentralization.",
        trilemma: { decentralization: 4, security: 7, scalability: 9 },
        trilemma_notes: {
            decentralization: "Low. A small set of elected block producers (e.g., 27 on Tron) governs the network, making it prone to voter apathy and delegate cartel alliances.",
            security: "Decent. If a delegate goes offline or behaves dishonestly, voters can dynamically remove their votes and replace them with a standby node.",
            scalability: "Extremely high. Minimal communication latency allows transaction speeds in the thousands of TPS and block cycles under 3 seconds."
        },
        steps: [
            { num: "01", title: "Voter Election", desc: "Token holders cast votes to select block producers, with voting weight decided by token balances." },
            { num: "02", title: "Schedule Rotation", desc: "The top-elected delegates are organized into a round-robin block production schedule." },
            { num: "03", title: "Block Creation", desc: "The scheduled delegate collects transactions and creates a block. They get paid in transaction fees." },
            { num: "04", title: "Rapid Finality", desc: "Elected peers verify the block. A 2/3 supermajority signature yields near-instant transaction finality." }
        ],
        blockchains: [
            { name: "Tron", symbol: "TRX", layer: "Layer 1", desc: "Coordinates 27 Super Representatives to support high-throughput, low-fee decentralized applications.", link: "https://tron.network" },
            { name: "Cosmos Hub", symbol: "ATOM", layer: "Layer 0", desc: "Runs Tendermint Core, a hybrid DPoS/BFT engine limiting validation to the top 180 staked nodes for high interchain speeds.", link: "https://cosmos.network" },
            { name: "EOS", symbol: "EOS", layer: "Layer 1", desc: "Employs 21 block producers to allocate RAM and CPU resources to accounts instead of requiring gas fees.", link: "https://eos.io" }
        ],
        languages: [
            { name: "Solidity", chains: "Tron (TVM)", desc: "Fully compatible with EVM Solidity, making it simple to redeploy Ethereum smart contracts on Tron." },
            { name: "Go / CosmWasm", chains: "Cosmos", desc: "Cosmos SDK relies on Go for modules, while CosmWasm lets developers write smart contracts in secure Rust." },
            { name: "C++ / WASM", chains: "EOS", desc: "Smart contracts are compiled to high-speed WebAssembly (WASM) bytecode written in standard C++." }
        ]
    },
    poh: {
        id: "poh",
        name: "Proof of History (with PoS)",
        icon: "clock",
        short_desc: "Utilizes a cryptographical clock to establish timeline sequence before consensus.",
        description: "Proof of History (PoH) is an architectural sequence clock introduced by Solana. It is not a standalone consensus mechanism but works directly alongside Proof of Stake. PoH uses a sequential Verifiable Delay Function (VDF) running SHA-256 to create an unforgeable record of passage of time. This allows validators to determine the sequence of events without having to communicate with other nodes across the globe, allowing transactions to execute in parallel.",
        trilemma: { decentralization: 5, security: 8, scalability: 10 },
        trilemma_notes: {
            decentralization: "Moderate-low. Validator requirements demand high-spec server CPUs, GPUs, and 1 Gbps fiber internet, limiting node operation to professionals.",
            security: "Very strong. Combines PoS validator slashing safety nets with the cryptographic security of sequential history hashes.",
            scalability: "Maximum scalability. Achieves 50,000+ TPS and 400ms block times by eliminating network bottlenecks like mempools and sequential state queues."
        },
        steps: [
            { num: "01", title: "Sequential Hashing", desc: "A leader node runs a continuous loop of SHA-256 (VDF) to generate logical ticks (timestamps)." },
            { num: "02", title: "Timestamp Binding", desc: "Incoming transactions are integrated directly into the hashing sequence, proving when they occurred." },
            { num: "03", title: "GPU Parallelization", desc: "Transactions are broadcasted. Validators use GPU multithreading to verify the history ledger in parallel." },
            { num: "04", title: "Tower BFT Finality", desc: "A consensus layer of validators locks in their votes on the history checkpoints, concluding consensus." }
        ],
        blockchains: [
            { name: "Solana", symbol: "SOL", layer: "Layer 1", desc: "Designed to run at Nasdaq-like speeds, unifying smart contract logic into a single global state without sharding.", link: "https://solana.com" }
        ],
        languages: [
            { name: "Rust", chains: "Solana", desc: "The primary language for Solana smart contracts, compiling to Berkeley Packet Filter (BPF) for direct memory execution." },
            { name: "C / C++", chains: "Solana", desc: "Supported for writing raw contract endpoints, although Rust is heavily preferred for safety and tooling." }
        ]
    },
    pbft: {
        id: "pbft",
        name: "PBFT / Federated Consensus",
        icon: "key",
        short_desc: "Institutional voting rounds that deliver immediate transaction finality.",
        description: "Practical Byzantine Fault Tolerance (PBFT) and its Federated variants (like SCP) discard mining entirely in favor of multi-round voting. Nodes inside the network are pre-selected and verified. To finalize a block, nodes broadcast votes back and forth in three distinct rounds (Pre-prepare, Prepare, and Commit). It guarantees absolute finality once 2/3 of nodes agree. It is heavily utilized in enterprise and federated payment networks.",
        trilemma: { decentralization: 2, security: 9, scalability: 8 },
        trilemma_notes: {
            decentralization: "Extremely low. Permissioned/federated systems rely on a static, trusted whitelist of validators, restricting public participation.",
            security: "Extremely robust. It offers mathematical finality that resists up to 1/3 of nodes failing or lying. Forks are physically impossible.",
            scalability: "High. Achieves sub-second or 3-second block finalization with high throughput, but slows down significantly if the node count expands beyond a few hundred."
        },
        steps: [
            { num: "01", title: "Client Submission", desc: "A client submits a transaction request to a designated leader node." },
            { num: "02", title: "Pre-Prepare Round", desc: "The leader orders the transaction and broadcasts it to all whitelist validator nodes." },
            { num: "03", title: "Prepare Round", desc: "Nodes validate the proposal and cross-broadcast their messages to all other validators." },
            { num: "04", title: "Commit & Finalization", desc: "Nodes broadcast a third confirmation. Once a node receives 2/3 + 1 identical commits, it writes the state." }
        ],
        blockchains: [
            { name: "Ripple", symbol: "XRP", layer: "Layer 1", desc: "Uses the Ripple Protocol Consensus Algorithm (RPCA) with institutional validators to process global banking settlements.", link: "https://ripple.com" },
            { name: "Stellar", symbol: "XLM", layer: "Layer 1", desc: "Uses the Stellar Consensus Protocol (SCP) where nodes dynamically build trusted clusters called Quorums.", link: "https://stellar.org" },
            { name: "Hyperledger Fabric", symbol: "HLF", layer: "Enterprise DLT", desc: "A private enterprise framework utilizing customizable PBFT/Raft voting pools to log supply chain data.", link: "https://hyperledger.org" }
        ],
        languages: [
            { name: "Soroban / Rust", chains: "Stellar", desc: "Stellar's smart contract environment, executing Rust code compiled to WebAssembly (WASM) for resource efficiency." },
            { name: "C++", chains: "Ripple / Stellar Core", desc: "The core nodes of both Ripple and Stellar are built in C++ to achieve high network connection throughput." },
            { name: "Chaincode (Go/Java/TS)", chains: "Hyperledger Fabric", desc: "Allows standard backend business logic to be deployed as smart contracts in enterprise networks." }
        ]
    },
    poa: {
        id: "poa",
        name: "Proof of Authority",
        icon: "award",
        short_desc: "Validators stake their public identity and reputation instead of capital.",
        description: "Proof of Authority (PoA) is a reputation-based consensus protocol. Instead of staking capital (PoS) or burning electricity (PoW), validation nodes are selected based on their real-world identity and reputation. Validators are verified corporations or institutions that undergo background checks. PoA is a natural fit for private blockchains, consortium networks, and sidechains where trust is backed by legal agreements and public accountability.",
        trilemma: { decentralization: 3, security: 7, scalability: 8 },
        trilemma_notes: {
            decentralization: "Low. The network is operated by a small, centralized group of approved corporate partners, locking out public operators.",
            security: "Good, but reliant on validator vetting. If a node goes rogue, they lose their business license and public trust, but validator keys are targeted in hacks.",
            scalability: "High. Operates on a highly predictable schedule, enabling consistent block throughput, rapid finality, and negligible fees."
        },
        steps: [
            { num: "01", title: "Vetting & KYC", desc: "Entities undergo strict legal verification, proving their identity and registering a public key." },
            { num: "02", title: "Authorization", desc: "The governance body grants the vetted address the permission to validate block transactions." },
            { num: "03", title: "Scheduled Production", desc: "Active validators take turns compiling transactions and publishing blocks in a sequential rotation." },
            { num: "04", title: "Public Penalty", desc: "Any validator caught proposing invalid states is instantly blacklisted, and their corporate identity is publicized." }
        ],
        blockchains: [
            { name: "VeChain", symbol: "VET", layer: "Layer 1", desc: "Uses PoA 2.0 to assure enterprise clients of predictable transaction fees, high security, and clean governance.", link: "https://vechain.org" },
            { name: "BNB Smart Chain", symbol: "BSC", layer: "Layer 1", desc: "Uses Proof of Staked Authority (PoSA), where validator spots are selected by BNB staking weight, but capped at 21 nodes.", link: "https://bnbchain.org" }
        ],
        languages: [
            { name: "Solidity", chains: "BSC / VeChain", desc: "Both chains operate as EVM (Ethereum Virtual Machine) forks, utilizing Solidity to compile smart contracts." }
        ]
    },
    pob: {
        id: "pob",
        name: "Proof of Burn",
        icon: "flame",
        short_desc: "Validators permanently destroy native coins to buy virtual mining rigs.",
        description: "Proof of Burn (PoB) operates by requiring participants to send native tokens to a verifiably unspendable address (burning them). In exchange, the protocol assigns them 'virtual mining power' proportional to the destroyed value. As time passes, the virtual rig's hashing power decays, requiring validators to periodically burn more coins. This eliminates PoW's extreme energy use and avoids PoS's issue of validators hoarding supply, but forces users to permanently destroy asset capital to participate.",
        trilemma: { decentralization: 6, security: 8, scalability: 5 },
        trilemma_notes: {
            decentralization: "Moderate. Virtual rig decay prevents early burners from permanently controlling validation slots, but capital requirements still favor wealthy nodes.",
            security: "Robust security. Burning tokens permanently shrinks the circulating supply, making Sybil attacks and double-spends highly expensive as target tokens must be permanently destroyed.",
            scalability: "Moderate. Usually built on top of PoW or PoS style transaction routing systems, offering moderate transaction finality times."
        },
        steps: [
            { num: "01", title: "Asset Burning", desc: "Validators send native cryptocurrency to a designated unspendable eater address." },
            { num: "02", title: "Rig Assignment", desc: "The protocol verifies the transaction and credits the sender with corresponding virtual mining rigs." },
            { num: "03", title: "Block Creation", desc: "A validation lottery determines the block proposer based on current active virtual rig shares." },
            { num: "04", title: "Power Decay", desc: "Virtual rig capacity decays at scheduled intervals, forcing nodes to burn new rewards to maintain share." }
        ],
        blockchains: [
            { name: "Counterparty", symbol: "XCP", layer: "Layer 2", desc: "Distributed its initial token supply by requiring users to burn Bitcoin in exchange for native XCP, securing a fair launch.", link: "https://counterparty.io" },
            { name: "Slimcoin", symbol: "SLM", layer: "Layer 1", desc: "A lightweight cryptocurrency combining PoW, PoS, and Proof of Burn to allow everyday devices to secure the network.", link: "https://slimcoin.org" }
        ],
        languages: [
            { name: "Python", chains: "Counterparty", desc: "The Reference node implementation is written in Python, extending Bitcoin core functions through OP_RETURN meta code." },
            { name: "C++", chains: "Slimcoin Core", desc: "Core nodes are coded in C++ to optimize block verification schedules and peer connection protocols." }
        ]
    }
};

// --- Protocol Compatibility & Interoperability Data ---

const matrixBlockchains = ["BTC", "ETH", "ADA", "SOL", "ATOM", "XLM", "BSC", "VET"];

const compatibilityMatrix = {
    "BTC-BTC": { status: "high", label: "NATIVE", desc: "Same network. Transactions are natively validated and settled on the Bitcoin blockchain." },
    "BTC-ETH": { 
        status: "low", 
        label: "INCOMPATIBLE", 
        desc: "Bitcoin uses PoW (Script-based UTXO) and Ethereum uses PoS (EVM Account-based). Direct communication is impossible.",
        details: "Requires wrapped tokens (like wBTC) issued by custodial entities or decentralized smart contract bridges (e.g., Threshold Network). Alternatively, atomic swaps can be set up via Hash Time Locked Contracts (HTLCs) for trustless exchange, but they do not support complex smart contract interaction."
    },
    "BTC-ADA": { 
        status: "low", 
        label: "INCOMPATIBLE", 
        desc: "Bitcoin uses PoW (Script UTXO) while Cardano uses Ouroboros PoS (eUTXO). They cannot read each other's state.",
        details: "Interoperability requires wrapping assets (e.g. anetaBTC) on Cardano. Because Cardano utilizes a unique extended UTXO (eUTXO) model, writing secure multi-signature bridges to verify Bitcoin UTXOs is mathematically challenging but possible via functional smart contracts."
    },
    "BTC-SOL": { 
        status: "low", 
        label: "INCOMPATIBLE", 
        desc: "Bitcoin (PoW) and Solana (PoH/PoS) share no architectural commonalities.",
        details: "Interoperability requires external bridge systems such as Wormhole or Portal. Solana validators cannot read Bitcoin's probabilistic chain without an oracle or an intermediary relayer network that locks BTC on the Bitcoin network and mints wrapped SOL-BTC."
    },
    "BTC-ATOM": { 
        status: "low", 
        label: "INCOMPATIBLE", 
        desc: "Bitcoin (PoW) cannot connect directly to Cosmos (Tendermint DPoS) without specialized peg zones.",
        details: "Cosmos has created specialized peg chains like Nomic. Nomic acts as a decentralized custodian utilizing Bitcoin multi-sig wallets, allowing users to deposit native BTC and receive nBTC (an IBC-compatible token) across the Cosmos interchain."
    },
    "BTC-XLM": { 
        status: "low", 
        label: "INCOMPATIBLE", 
        desc: "Bitcoin (PoW) and Stellar (SCP) operate on entirely different consensus paradigms.",
        details: "Cross-chain swaps are accomplished through decentralized multi-signature anchors, or centralized portals. Stellar possesses a native decentralized exchange (DEX) which relies on trusted anchor nodes to wrap and represent BTC on the Stellar network."
    },
    "BTC-BSC": { 
        status: "low", 
        label: "INCOMPATIBLE", 
        desc: "Bitcoin (PoW) and BNB Smart Chain (PoSA EVM) are incompatible at the protocol level.",
        details: "Assets must be wrapped. Binance operates a custodial bridge that locks BTC on Bitcoin and mints BTCB (an BEP-20 token) on BNB Smart Chain, backing it 1:1."
    },
    "BTC-VET": { 
        status: "low", 
        label: "INCOMPATIBLE", 
        desc: "Bitcoin PoW shares no protocol links with VeChain's enterprise PoA 2.0 system.",
        details: "Requires specialized bridging or multi-token wrappers. Typically, exchange of assets between these two networks requires a centralized custodian or secondary bridge provider."
    },

    "ETH-ETH": { status: "high", label: "NATIVE", desc: "Same network. Transactions run natively on the Ethereum Virtual Machine (EVM)." },
    "ETH-ADA": { 
        status: "medium", 
        label: "PARTIAL", 
        desc: "Both are PoS Layer 1s, but Ethereum uses accounts while Cardano uses an eUTXO accounting model.",
        details: "State bridges and EVM-compatible sidechains (like Milkomeda C1) act as translators, converting Ethereum EVM calls into Cardano eUTXO transactions. Asset transfers require locking tokens on Ethereum and minting wrapped equivalents on Cardano."
    },
    "ETH-SOL": { 
        status: "low", 
        label: "INCOMPATIBLE", 
        desc: "Solana's parallel PoH execution and Ethereum's serial EVM are incompatible.",
        details: "Requires decentralized cross-chain messaging bridges (like Wormhole). When bridging, validators on a separate relayer network ('Guardians') watch Ethereum contracts, verify event logs, and broadcast the messages to Solana to trigger minting actions."
    },
    "ETH-ATOM": { 
        status: "medium", 
        label: "PARTIAL", 
        desc: "Cosmos utilizes DPoS, but supports EVM compatibility layers and bridges.",
        details: "Bridges like the Gravity Bridge or Cosmos EVM hubs (Evmos) translate Ethereum state into Tendermint-compatible formats. This allows Ethereum assets to enter the Inter-Blockchain Communication (IBC) ecosystem of Cosmos."
    },
    "ETH-XLM": { 
        status: "low", 
        label: "INCOMPATIBLE", 
        desc: "Stellar's SCP voting is incompatible with Ethereum's PoS attestation.",
        details: "Bridges are required. Stellar's new Soroban smart contract layer allows the creation of decentralized bridge contracts, but it still requires off-chain oracle relayers to verify state changes across both ecosystems."
    },
    "ETH-BSC": { 
        status: "high", 
        label: "COMPATIBLE", 
        desc: "BNB Smart Chain is an EVM clone using PoSA. They share identical address spaces and contract structures.",
        details: "Extremely high compatibility. Because BSC is a fork of Ethereum's codebase, smart contracts can be deployed onto both networks with zero code modifications. Bridging is simple and highly efficient using standard cross-chain EVM bridge patterns."
    },
    "ETH-VET": { 
        status: "high", 
        label: "COMPATIBLE", 
        desc: "VeChain is fully EVM-compatible, running a modified EVM with a PoA consensus layer.",
        details: "High compatibility. Solidity developers can build on VeChain using standard Ethereum tooling (Hardhat, ethers.js). Bridging contracts map assets easily, sharing the exact same cryptographic transaction format."
    },

    "ADA-ADA": { status: "high", label: "NATIVE", desc: "Same network. Native Cardano transactions." },
    "ADA-SOL": { 
        status: "low", 
        label: "INCOMPATIBLE", 
        desc: "Cardano's eUTXO (Haskell) and Solana's account model (Rust) share no design patterns.",
        details: "Bridging requires third-party cross-chain message passing networks like Wormhole, which lock assets on one chain and mint synthetic wrappers on the target chain."
    },
    "ADA-ATOM": { 
        status: "medium", 
        label: "PARTIAL", 
        desc: "Both are PoS-based architectures, but operate on different networking stacks.",
        details: "Integration is typically handled by sidechains or custom Cosmos SDK modules designed to interpret Cardano's ledger state, allowing future integration into the Cosmos IBC network."
    },
    "ADA-XLM": { 
        status: "low", 
        label: "INCOMPATIBLE", 
        desc: "Cardano's Ouroboros PoS and Stellar's SCP are completely incompatible.",
        details: "Requires centralized multi-signature token wrapper anchors or external oracle bridges."
    },
    "ADA-BSC": { 
        status: "low", 
        label: "INCOMPATIBLE", 
        desc: "Cardano eUTXO and BSC EVM are incompatible.",
        details: "Requires specialized bridging or cross-chain virtual machines (like Milkomeda Cardano sidechain which connects to EVM chains)."
    },
    "ADA-VET": { 
        status: "low", 
        label: "INCOMPATIBLE", 
        desc: "Cardano eUTXO PoS and VeChain EVM PoA are architecturally incompatible.",
        details: "Requires wrapper bridges to translate EVM state logic to eUTXO logic."
    },

    "SOL-SOL": { status: "high", label: "NATIVE", desc: "Same network. Native Solana instructions." },
    "SOL-ATOM": { 
        status: "low", 
        label: "INCOMPATIBLE", 
        desc: "Solana's logical clock PoH and Cosmos Hub's Tendermint DPoS are incompatible.",
        details: "Bridging is managed via Wormhole, bridging SOL assets directly into Cosmos App-Chains via Cosmos IBC wrapper zones."
    },
    "SOL-XLM": { 
        status: "low", 
        label: "INCOMPATIBLE", 
        desc: "Solana PoH and Stellar SCP share no common consensus elements.",
        details: "Bridging requires centralized asset anchors or custom off-chain multisig validators."
    },
    "SOL-BSC": { 
        status: "low", 
        label: "INCOMPATIBLE", 
        desc: "Solana's parallel engine is incompatible with BSC's serial EVM engine.",
        details: "Requires decentralized message-passing bridges (e.g. Wormhole, Portal, deBridge) to lock BSC BEP-20 tokens and mint SPL tokens on Solana."
    },
    "SOL-VET": { 
        status: "low", 
        label: "INCOMPATIBLE", 
        desc: "Solana PoH and VeChain PoA are incompatible.",
        details: "Requires external trustless/federated bridges."
    },

    "ATOM-ATOM": { status: "high", label: "NATIVE", desc: "Same network. Interoperates natively via IBC (Inter-Blockchain Communication)." },
    "ATOM-XLM": { 
        status: "low", 
        label: "INCOMPATIBLE", 
        desc: "Cosmos Tendermint and Stellar SCP are incompatible.",
        details: "Requires specialized bridge layers to lock assets on Stellar and mint them as IBC-compatible assets on Cosmos."
    },
    "ATOM-BSC": { 
        status: "medium", 
        label: "PARTIAL", 
        desc: "BSC was built using parts of the Cosmos SDK codebase, but operates as a separate EVM.",
        details: "Bridges can easily link BSC to Cosmos Hub. Since BSC was designed with Cosmos architecture principles in mind, state relays can be built with lower friction than bridging to Ethereum."
    },
    "ATOM-VET": { 
        status: "low", 
        label: "INCOMPATIBLE", 
        desc: "Cosmos Tendermint and VeChain PoA share no common ground.",
        details: "Requires decentralized wrapping protocols or custodial anchors."
    },

    "XLM-XLM": { status: "high", label: "NATIVE", desc: "Same network. Stellar ledger transactions." },
    "XLM-BSC": { 
        status: "low", 
        label: "INCOMPATIBLE", 
        desc: "Stellar SCP and BSC EVM are incompatible.",
        details: "Requires bridges or multi-sig anchors to wrap BEP-20 assets on Stellar."
    },
    "XLM-VET": { 
        status: "low", 
        label: "INCOMPATIBLE", 
        desc: "Stellar SCP and VeChain PoA are incompatible.",
        details: "Requires external state validation or multi-signature escrow."
    },

    "BSC-BSC": { status: "high", label: "NATIVE", desc: "Same network. Native BNB Smart Chain transactions." },
    "BSC-VET": { 
        status: "high", 
        label: "COMPATIBLE", 
        desc: "Both are EVM compatible with structured validator sets (PoSA vs PoA).",
        details: "High compatibility. Since both networks execute standard Solidity EVM bytecode, developers can deploy the exact same contracts. Multi-sig bridges translate tokens between BEP-20 and VIP-180 (VeChain token standard) efficiently."
    },

    "VET-VET": { status: "high", label: "NATIVE", desc: "Same network. Native VeChain transactions." }
};

// Global App State
let activeAlgo = "pow";
let chartInstance = null;

// Initialize Application UI
document.addEventListener("DOMContentLoaded", () => {
    // Start custom cursor immediately (before loading screen finishes)
    initCustomCursor();

    // 0. Start Loading Screen Animation
    initLoadingScreen(() => {
        // 1. Render Selector Cards
        renderAlgorithmSelectors();
        
        // 2. Hydrate Dashboard with Active Protocol (PoW)
        updateDashboard(activeAlgo);
        
        // 3. Render Interoperability Matrix
        renderCompatibilityMatrix();
        
        // 4. Setup Event Listeners for UI Components
        setupEventListeners();

        // 4.5 Initialize Comparison Selectors
        initComparisonSelectors();
        
        // 5. Initialize Lucide Icons for HTML elements
        lucide.createIcons();

        // 6. Initialize Futuristic Canvas & Card Interactions
        initParticleCanvas();
        initCardTilt();

        // 7. Scroll-based Reveal and Header Shrink
        initScrollReveal();
        initHeaderScroll();
    });
});

// Render the top/sidebar cards for selecting algorithms
function renderAlgorithmSelectors() {
    const container = document.getElementById("algorithm-selector-container");
    container.innerHTML = "";
    
    Object.keys(consensusData).forEach(key => {
        const algo = consensusData[key];
        const card = document.createElement("div");
        card.className = `algo-card glass ${key === activeAlgo ? 'active' : ''}`;
        card.setAttribute("data-algo-id", key);
        
        card.innerHTML = `
            <div class="algo-icon-wrapper">
                <i data-lucide="${algo.icon}"></i>
            </div>
            <h4>${algo.name}</h4>
            <p>${algo.short_desc}</p>
        `;
        
        card.addEventListener("click", () => {
            // Remove active state from other cards
            document.querySelectorAll(".algo-card").forEach(c => c.classList.remove("active"));
            card.classList.add("active");
            
            // Update app state and refresh panel content
            activeAlgo = key;
            updateDashboard(activeAlgo);
        });
        
        container.appendChild(card);
    });
}

// Update all four panels of the central dashboard
function updateDashboard(algoId) {
    const data = consensusData[algoId];
    
    // Update Overview Header & Description
    document.getElementById("overview-title").textContent = data.name;
    document.getElementById("overview-desc").textContent = data.description;
    
    // Animate flow step rendering
    const stepsContainer = document.getElementById("flowchart-steps-container");
    stepsContainer.innerHTML = "";
    data.steps.forEach((step, index) => {
        const stepDiv = document.createElement("div");
        stepDiv.className = "flow-step";
        stepDiv.style.animationDelay = `${index * 0.1}s`;
        stepDiv.innerHTML = `
            <div class="flow-step-num">${step.num}</div>
            <div class="flow-step-content">
                <h5>${step.title}</h5>
                <p>${step.desc}</p>
            </div>
        `;
        stepsContainer.appendChild(stepDiv);
    });

    // Update Trilemma Ratings Scorecard Text
    document.getElementById("val-decentralization").textContent = `${data.trilemma.decentralization}/10`;
    document.getElementById("val-security").textContent = `${data.trilemma.security}/10`;
    document.getElementById("val-scalability").textContent = `${data.trilemma.scalability}/10`;
    
    document.getElementById("fill-decentralization").style.width = `${data.trilemma.decentralization * 10}%`;
    document.getElementById("fill-security").style.width = `${data.trilemma.security * 10}%`;
    document.getElementById("fill-scalability").style.width = `${data.trilemma.scalability * 10}%`;
    
    document.getElementById("desc-decentralization").textContent = data.trilemma_notes.decentralization;
    document.getElementById("desc-security").textContent = data.trilemma_notes.security;
    document.getElementById("desc-scalability").textContent = data.trilemma_notes.scalability;
    
    // Render/Update Chart.js Radar Chart
    renderRadarChart(data.trilemma);
    
    // Render Blockchain Mapping Cards
    const mappingContainer = document.getElementById("blockchain-mapping-container");
    mappingContainer.innerHTML = "";
    data.blockchains.forEach(bc => {
        const card = document.createElement("div");
        card.className = "bc-card";
        card.innerHTML = `
            <div>
                <div class="bc-card-header">
                    <div class="bc-name-symbol">
                        <div class="bc-logo-fallback">${bc.symbol.substring(0, 2)}</div>
                        <div>
                            <div class="bc-name">${bc.name}</div>
                            <div class="bc-symbol">${bc.symbol}</div>
                        </div>
                    </div>
                    <span class="bc-meta-badge">${bc.layer}</span>
                </div>
                <p class="bc-description">${bc.desc}</p>
            </div>
            <div class="bc-meta">
                <a href="${bc.link}" target="_blank" class="bc-meta-badge" style="color: var(--neon); text-decoration: none;">Official Site &rarr;</a>
            </div>
        `;
        mappingContainer.appendChild(card);
    });
    
    // Render Smart Contract Languages List
    const langContainer = document.getElementById("languages-list-container");
    langContainer.innerHTML = "";
    data.languages.forEach(lang => {
        const item = document.createElement("div");
        item.className = "lang-item";
        item.innerHTML = `
            <div class="lang-header">
                <span class="lang-name">${lang.name}</span>
                <span class="lang-chains-pill">${lang.chains}</span>
            </div>
            <p class="lang-desc">${lang.desc}</p>
        `;
        langContainer.appendChild(item);
    });
    
    // Re-initialize dynamic Lucide icons
    lucide.createIcons();
}

// Generate the Radar Chart
function renderRadarChart(ratings) {
    if (chartInstance) {
        chartInstance.destroy();
    }
    
    const ctx = document.getElementById('trilemmaChart').getContext('2d');
    chartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Decentralization', 'Security', 'Scalability'],
            datasets: [{
                label: 'Score',
                data: [ratings.decentralization, ratings.security, ratings.scalability],
                backgroundColor: 'rgba(0, 255, 136, 0.08)',
                borderColor: 'rgba(0, 255, 136, 0.7)',
                borderWidth: 2,
                pointBackgroundColor: '#00FF88',
                pointBorderColor: '#050505',
                pointHoverBackgroundColor: '#050505',
                pointHoverBorderColor: '#00FF88',
                pointRadius: 5,
                pointHitRadius: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    min: 0,
                    max: 10,
                    ticks: {
                        display: false,
                        stepSize: 2
                    },
                    grid: {
                        color: 'rgba(0, 255, 136, 0.06)'
                    },
                    angleLines: {
                        color: 'rgba(0, 255, 136, 0.06)'
                    },
                    pointLabels: {
                        color: '#B4BBB7',
                        font: {
                            family: 'Inter',
                            size: 11,
                            weight: '600'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 14, 10, 0.92)',
                    borderColor: 'rgba(0, 255, 136, 0.3)',
                    borderWidth: 1,
                    titleColor: '#00FF88',
                    bodyColor: '#F7FFF8',
                    titleFont: { family: 'Space Grotesk', weight: '700' },
                    bodyFont: { family: 'Fira Code' },
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}/10`;
                        }
                    }
                }
            }
        }
    });
}

// Render the 8x8 Compatibility Matrix Heatmap
function renderCompatibilityMatrix() {
    const container = document.getElementById("compatibility-matrix-container");
    container.innerHTML = "";
    
    const table = document.createElement("table");
    table.className = "matrix-table";
    
    // Header Row
    const headerRow = document.createElement("tr");
    const cornerTh = document.createElement("th");
    cornerTh.className = "matrix-corner";
    cornerTh.innerHTML = "";
    headerRow.appendChild(cornerTh);
    
    matrixBlockchains.forEach(chain => {
        const th = document.createElement("th");
        th.textContent = chain;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    
    // Matrix Data Rows
    matrixBlockchains.forEach(rowChain => {
        const tr = document.createElement("tr");
        
        // Row Label Header
        const rowHeader = document.createElement("td");
        rowHeader.textContent = rowChain;
        tr.appendChild(rowHeader);
        
        matrixBlockchains.forEach(colChain => {
            const td = document.createElement("td");
            
            // Build keys (e.g. BTC-ETH or ETH-BTC, both map to same matrix element)
            let key = `${rowChain}-${colChain}`;
            let matrixData = compatibilityMatrix[key];
            
            if (!matrixData) {
                key = `${colChain}-${rowChain}`;
                matrixData = compatibilityMatrix[key];
            }
            
            td.className = "matrix-cell";
            
            let bgClass = "cell-compat-low";
            if (matrixData.status === "high") bgClass = "cell-compat-high";
            else if (matrixData.status === "medium") bgClass = "cell-compat-medium";
            
            td.classList.add(bgClass);
            
            td.innerHTML = `
                <div class="matrix-cell-content">
                    <span class="cell-status-label">${matrixData.label}</span>
                    <span class="cell-info-hint">Click &rarr;</span>
                </div>
            `;
            
            // Add click listener to show interop details modal
            td.addEventListener("click", () => {
                showInteropModal(rowChain, colChain, matrixData);
            });
            
            tr.appendChild(td);
        });
        
        table.appendChild(tr);
    });
    
    container.appendChild(table);
}

// Display Interoperability Modal Details
function showInteropModal(chainA, chainB, interopData) {
    const modal = document.getElementById("interop-modal");
    const content = document.getElementById("modal-body-content");
    
    let statusClass = "text-red";
    let statusBg = "rgba(255, 76, 76, 0.08)";
    let statusBorder = "rgba(255, 76, 76, 0.25)";
    
    if (interopData.status === "high") {
        statusClass = "text-green";
        statusBg = "rgba(0, 255, 136, 0.08)";
        statusBorder = "rgba(0, 255, 136, 0.25)";
    } else if (interopData.status === "medium") {
        statusClass = "text-yellow";
        statusBg = "rgba(255, 214, 0, 0.08)";
        statusBorder = "rgba(255, 214, 0, 0.25)";
    }
    
    content.innerHTML = `
        <div class="interop-header-grid">
            <div class="interop-node">
                <div class="interop-node-logo">${chainA}</div>
                <div class="interop-node-name">${chainA} Ledger</div>
            </div>
            
            <div class="interop-bridge-wire">
                <span class="interop-badge-indicator ${statusClass}" style="background: ${statusBg}; border: 1px solid ${statusBorder};">
                    ${interopData.label}
                </span>
                <div class="wire-line">
                    <div class="wire-line-filled"></div>
                    <div class="wire-indicator-dot" style="background-color: ${interopData.status === 'high' ? '#00FF88' : interopData.status === 'medium' ? '#FFD600' : '#FF4C4C'}; box-shadow: 0 0 8px ${interopData.status === 'high' ? 'rgba(0,255,136,0.5)' : interopData.status === 'medium' ? 'rgba(255,214,0,0.4)' : 'rgba(255,76,76,0.4)'};"></div>
                </div>
            </div>
            
            <div class="interop-node">
                <div class="interop-node-logo">${chainB}</div>
                <div class="interop-node-name">${chainB} Ledger</div>
            </div>
        </div>
        
        <div class="interop-details-section">
            <div class="interop-bullet-detail" style="border-left: 3px solid ${interopData.status === 'high' ? '#00FF88' : interopData.status === 'medium' ? '#FFD600' : '#FF4C4C'};">
                <h5><i data-lucide="info" class="text-blue" style="width: 14px; height: 14px;"></i> Core Compatibility Summary</h5>
                <p class="interop-block-desc">${interopData.desc}</p>
            </div>
            
            ${interopData.details ? `
            <div class="interop-bullet-detail">
                <h5><i data-lucide="link" class="text-purple" style="width: 14px; height: 14px;"></i> Technical Interoperability Bridge</h5>
                <p class="interop-block-desc">${interopData.details}</p>
            </div>
            ` : `
            <div class="interop-bullet-detail">
                <h5><i data-lucide="shield-alert" class="text-green" style="width: 14px; height: 14px;"></i> Native Protocol Alignment</h5>
                <p class="interop-block-desc">Since these nodes exist on the exact same blockchain network, they enjoy absolute protocol alignment. Transactions require no bridges or wrapping contracts to interoperate, achieving maximum cryptographic safety.</p>
            </div>
            `}
        </div>
    `;
    
    modal.classList.add("open");
    lucide.createIcons();
}

// UI Event Listeners Setup
function setupEventListeners() {
    // Drawer handlers
    const toggleGuideBtn = document.getElementById("toggle-guide-btn");
    const closeDrawerBtn = document.getElementById("close-drawer-btn");
    const educationalDrawer = document.getElementById("educational-drawer");
    const drawerOverlay = document.getElementById("drawer-overlay");
    
    toggleGuideBtn.addEventListener("click", () => {
        educationalDrawer.classList.add("open");
        drawerOverlay.classList.add("active");
    });
    
    const closeDrawer = () => {
        educationalDrawer.classList.remove("open");
        drawerOverlay.classList.remove("active");
    };
    
    closeDrawerBtn.addEventListener("click", closeDrawer);
    drawerOverlay.addEventListener("click", closeDrawer);
    
    // Modal handlers
    const closeModalBtn = document.querySelector(".close-modal-btn");
    const modal = document.getElementById("interop-modal");
    
    const closeModal = () => {
        modal.classList.remove("open");
    };
    
    closeModalBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// --- Algorithm Comparison Feature ---

let compareChartInstance = null;

// Populate comparison dropdowns with all algorithms
function initComparisonSelectors() {
    const selectA = document.getElementById("compare-algo-a");
    const selectB = document.getElementById("compare-algo-b");
    const compareBtn = document.getElementById("compare-btn");

    Object.keys(consensusData).forEach(key => {
        const algo = consensusData[key];
        const optA = document.createElement("option");
        optA.value = key;
        optA.textContent = algo.name;
        selectA.appendChild(optA);

        const optB = document.createElement("option");
        optB.value = key;
        optB.textContent = algo.name;
        selectB.appendChild(optB);
    });

    // Enable/disable compare button based on selections
    const checkSelections = () => {
        const a = selectA.value;
        const b = selectB.value;
        compareBtn.disabled = !a || !b || a === b;
    };

    selectA.addEventListener("change", checkSelections);
    selectB.addEventListener("change", checkSelections);

    compareBtn.addEventListener("click", () => {
        const a = selectA.value;
        const b = selectB.value;
        if (a && b && a !== b) {
            runComparison(a, b);
        }
    });
}

// Compute commonalities & differences between two algorithms
function computeComparison(idA, idB) {
    const a = consensusData[idA];
    const b = consensusData[idB];

    const commonalities = [];
    const differences = [];

    // 1. Trilemma score comparison
    const trilemmaKeys = ["decentralization", "security", "scalability"];
    trilemmaKeys.forEach(key => {
        const scoreA = a.trilemma[key];
        const scoreB = b.trilemma[key];
        const label = key.charAt(0).toUpperCase() + key.slice(1);
        if (scoreA === scoreB) {
            commonalities.push({
                label: `${label} Score`,
                value: `Both protocols score ${scoreA}/10 for ${label.toLowerCase()}.`
            });
        } else {
            differences.push({
                label: `${label} Score`,
                valueA: `${scoreA}/10 — ${a.trilemma_notes[key]}`,
                valueB: `${scoreB}/10 — ${b.trilemma_notes[key]}`
            });
        }
    });

    // 2. Shared smart contract languages
    const langsA = a.languages.map(l => l.name.toLowerCase().split("/")[0].trim());
    const langsB = b.languages.map(l => l.name.toLowerCase().split("/")[0].trim());
    const sharedLangs = [];
    a.languages.forEach(lA => {
        const nameA = lA.name.toLowerCase().split("/")[0].trim();
        b.languages.forEach(lB => {
            const nameB = lB.name.toLowerCase().split("/")[0].trim();
            if (nameA === nameB && !sharedLangs.includes(lA.name)) {
                sharedLangs.push(lA.name);
            }
        });
    });
    if (sharedLangs.length > 0) {
        commonalities.push({
            label: "Shared Smart Contract Languages",
            value: `Both support: ${sharedLangs.join(", ")}.`
        });
    }

    const uniqueLangsA = a.languages.filter(l => {
        const n = l.name.toLowerCase().split("/")[0].trim();
        return !langsB.some(lb => lb === n);
    });
    const uniqueLangsB = b.languages.filter(l => {
        const n = l.name.toLowerCase().split("/")[0].trim();
        return !langsA.some(la => la === n);
    });
    if (uniqueLangsA.length > 0 || uniqueLangsB.length > 0) {
        differences.push({
            label: "Unique Languages",
            valueA: uniqueLangsA.length > 0 ? uniqueLangsA.map(l => `${l.name} (${l.chains})`).join(", ") : "None unique",
            valueB: uniqueLangsB.length > 0 ? uniqueLangsB.map(l => `${l.name} (${l.chains})`).join(", ") : "None unique"
        });
    }

    // 3. Shared blockchains (unlikely but check)
    const chainsA = a.blockchains.map(bc => bc.name);
    const chainsB = b.blockchains.map(bc => bc.name);
    const sharedChains = chainsA.filter(c => chainsB.includes(c));
    if (sharedChains.length > 0) {
        commonalities.push({
            label: "Shared Blockchain Networks",
            value: `Both power: ${sharedChains.join(", ")}.`
        });
    }

    // Always show different blockchains as a difference
    const uniqueChainsA = a.blockchains.filter(bc => !chainsB.includes(bc.name));
    const uniqueChainsB = b.blockchains.filter(bc => !chainsA.includes(bc.name));
    if (uniqueChainsA.length > 0 || uniqueChainsB.length > 0) {
        differences.push({
            label: "Blockchain Ecosystems",
            valueA: uniqueChainsA.map(bc => `${bc.name} (${bc.symbol})`).join(", ") || "—",
            valueB: uniqueChainsB.map(bc => `${bc.name} (${bc.symbol})`).join(", ") || "—"
        });
    }

    // 4. Consensus flow steps count
    if (a.steps.length === b.steps.length) {
        commonalities.push({
            label: "Consensus Flow Complexity",
            value: `Both protocols operate in ${a.steps.length} sequential phases.`
        });
    } else {
        differences.push({
            label: "Consensus Flow Steps",
            valueA: `${a.steps.length} phases: ${a.steps.map(s => s.title).join(" → ")}`,
            valueB: `${b.steps.length} phases: ${b.steps.map(s => s.title).join(" → ")}`
        });
    }

    // 5. Layer analysis
    const layersA = [...new Set(a.blockchains.map(bc => bc.layer))];
    const layersB = [...new Set(b.blockchains.map(bc => bc.layer))];
    const sharedLayers = layersA.filter(l => layersB.includes(l));
    if (sharedLayers.length > 0) {
        commonalities.push({
            label: "Shared Operating Layers",
            value: `Both operate on: ${sharedLayers.join(", ")}.`
        });
    }
    const uniqueLayersA = layersA.filter(l => !layersB.includes(l));
    const uniqueLayersB = layersB.filter(l => !layersA.includes(l));
    if (uniqueLayersA.length > 0 || uniqueLayersB.length > 0) {
        differences.push({
            label: "Unique Operating Layers",
            valueA: uniqueLayersA.length > 0 ? uniqueLayersA.join(", ") : "—",
            valueB: uniqueLayersB.length > 0 ? uniqueLayersB.join(", ") : "—"
        });
    }

    // 6. Overall trilemma strength profile
    const sumA = a.trilemma.decentralization + a.trilemma.security + a.trilemma.scalability;
    const sumB = b.trilemma.decentralization + b.trilemma.security + b.trilemma.scalability;
    if (Math.abs(sumA - sumB) <= 2) {
        commonalities.push({
            label: "Overall Trilemma Balance",
            value: `Similar composite scores (${sumA}/30 vs ${sumB}/30), indicating comparable overall trade-off profiles.`
        });
    } else {
        const strongerLabel = sumA > sumB ? a.name : b.name;
        differences.push({
            label: "Trilemma Composite Score",
            valueA: `${sumA}/30 total`,
            valueB: `${sumB}/30 total`
        });
    }

    // 7. Description philosophy
    differences.push({
        label: "Core Philosophy",
        valueA: a.short_desc,
        valueB: b.short_desc
    });

    return { commonalities, differences };
}

// Render the full comparison results
function runComparison(idA, idB) {
    const a = consensusData[idA];
    const b = consensusData[idB];
    const { commonalities, differences } = computeComparison(idA, idB);
    const container = document.getElementById("compare-results-container");

    container.innerHTML = `
        <!-- Header badges -->
        <div class="compare-header-bar">
            <div class="compare-algo-badge side-a">
                <div class="algo-badge-icon"><i data-lucide="${a.icon}"></i></div>
                <div class="algo-badge-info">
                    <h4>${a.name}</h4>
                    <p>Protocol A</p>
                </div>
            </div>
            <span class="compare-header-vs">VS</span>
            <div class="compare-algo-badge side-b">
                <div class="algo-badge-icon"><i data-lucide="${b.icon}"></i></div>
                <div class="algo-badge-info">
                    <h4>${b.name}</h4>
                    <p>Protocol B</p>
                </div>
            </div>
        </div>

        <!-- Overlaid Radar Chart -->
        <div class="compare-radar-wrapper">
            <span class="card-subtitle">TRILEMMA OVERLAY</span>
            <div class="compare-radar-chart-box">
                <canvas id="compareRadarChart"></canvas>
            </div>
            <div class="compare-radar-legend">
                <div class="compare-radar-legend-item">
                    <div class="legend-swatch swatch-a"></div>
                    <span>${a.name}</span>
                </div>
                <div class="compare-radar-legend-item">
                    <div class="legend-swatch swatch-b"></div>
                    <span>${b.name}</span>
                </div>
            </div>
        </div>

        <!-- Panels -->
        <div class="compare-panels-grid">
            <!-- Commonalities Panel -->
            <div class="compare-panel panel-common">
                <div class="compare-panel-header">
                    <div class="panel-icon"><i data-lucide="check-circle"></i></div>
                    <h4>Commonalities</h4>
                    <span class="panel-count">${commonalities.length} found</span>
                </div>
                <div class="compare-panel-body" id="compare-common-body">
                    ${commonalities.length === 0 ? `
                        <div class="compare-empty-state">
                            <i data-lucide="search-x"></i>
                            <p>No significant commonalities detected between these protocols.</p>
                        </div>
                    ` : commonalities.map((item, i) => `
                        <div class="compare-item" style="animation-delay: ${i * 0.06}s">
                            <div class="compare-item-label">${item.label}</div>
                            <div class="compare-item-value">${item.value}</div>
                        </div>
                    `).join("")}
                </div>
            </div>

            <!-- Differences Panel -->
            <div class="compare-panel panel-diff">
                <div class="compare-panel-header">
                    <div class="panel-icon"><i data-lucide="git-branch"></i></div>
                    <h4>Differences</h4>
                    <span class="panel-count">${differences.length} found</span>
                </div>
                <div class="compare-panel-body" id="compare-diff-body">
                    ${differences.length === 0 ? `
                        <div class="compare-empty-state">
                            <i data-lucide="search-x"></i>
                            <p>No significant differences detected.</p>
                        </div>
                    ` : differences.map((item, i) => `
                        <div class="compare-item" style="animation-delay: ${i * 0.06}s">
                            <div class="compare-item-label">${item.label}</div>
                            <div class="compare-diff-values">
                                <div class="compare-diff-val val-a">
                                    <span class="diff-val-name">${a.name}</span>
                                    ${item.valueA}
                                </div>
                                <div class="compare-diff-val val-b">
                                    <span class="diff-val-name">${b.name}</span>
                                    ${item.valueB}
                                </div>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        </div>
    `;

    // Show with animation
    container.classList.remove("active");
    void container.offsetWidth; // force reflow
    container.classList.add("active");

    // Render overlay radar chart
    renderCompareRadarChart(a, b);

    // Re-init icons
    lucide.createIcons();

    // Smooth scroll to results
    container.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Render overlay radar chart for two algorithms
function renderCompareRadarChart(a, b) {
    if (compareChartInstance) {
        compareChartInstance.destroy();
    }

    const ctx = document.getElementById("compareRadarChart").getContext("2d");
    compareChartInstance = new Chart(ctx, {
        type: "radar",
        data: {
            labels: ["Decentralization", "Security", "Scalability"],
            datasets: [
                {
                    label: a.name,
                    data: [a.trilemma.decentralization, a.trilemma.security, a.trilemma.scalability],
                    backgroundColor: "rgba(0, 255, 136, 0.1)",
                    borderColor: "rgba(0, 255, 136, 0.8)",
                    borderWidth: 2,
                    pointBackgroundColor: "#00FF88",
                    pointBorderColor: "#050505",
                    pointRadius: 5,
                    pointHitRadius: 10
                },
                {
                    label: b.name,
                    data: [b.trilemma.decentralization, b.trilemma.security, b.trilemma.scalability],
                    backgroundColor: "rgba(0, 229, 255, 0.1)",
                    borderColor: "rgba(0, 229, 255, 0.8)",
                    borderWidth: 2,
                    pointBackgroundColor: "#00E5FF",
                    pointBorderColor: "#050505",
                    pointRadius: 5,
                    pointHitRadius: 10
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    min: 0,
                    max: 10,
                    ticks: { display: false, stepSize: 2 },
                    grid: { color: "rgba(0, 255, 136, 0.06)" },
                    angleLines: { color: "rgba(0, 255, 136, 0.06)" },
                    pointLabels: {
                        color: "#B4BBB7",
                        font: { family: "Inter", size: 11, weight: "600" }
                    }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: "rgba(10, 14, 10, 0.92)",
                    borderColor: "rgba(0, 255, 136, 0.3)",
                    borderWidth: 1,
                    titleColor: "#00FF88",
                    bodyColor: "#F7FFF8",
                    titleFont: { family: "Space Grotesk", weight: "700" },
                    bodyFont: { family: "Fira Code" },
                    callbacks: {
                        label: function (context) {
                            return `${context.dataset.label}: ${context.raw}/10`;
                        }
                    }
                }
            }
        }
    });
}

// --- Futuristic UI Helper Logic ---

// 0. Loading Screen
function initLoadingScreen(callback) {
    const screen = document.getElementById('loading-screen');
    const bar = document.getElementById('loader-bar');
    const pct = document.getElementById('loader-pct');
    if (!screen) { callback(); return; }
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 12 + 3;
        if (progress > 100) progress = 100;
        bar.style.width = progress + '%';
        pct.textContent = Math.round(progress) + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                screen.classList.add('hidden');
                callback();
            }, 400);
        }
    }, 80);
}

// 1. Background Particle Network Animation (Neon Green)
function initParticleCanvas() {
    const canvas = document.getElementById("particle-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    let particles = [];
    const particleCount = 55;
    const connectionDistance = 120;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.25;
            this.vy = (Math.random() - 0.5) * 0.25;
            this.radius = Math.random() * 1.8 + 0.6;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(0, 255, 136, 0.25)";
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < connectionDistance) {
                    const alpha = (1 - dist / connectionDistance) * 0.08;
                    ctx.strokeStyle = `rgba(0, 255, 136, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// 2. Custom Cursor — Dot + Ring
function initCustomCursor() {
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    if (!dot || !ring) return;
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    let dotX = mouseX;
    let dotY = mouseY;
    let ringX = mouseX;
    let ringY = mouseY;
    
    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        const target = e.target;
        const isHoverable = target.closest("a, button, .algo-card, .matrix-cell, .close-btn, .close-modal-btn, .btn, .bc-card, .lang-item, .intro-card");
        if (isHoverable) {
            document.body.classList.add("cursor-hover");
        } else {
            document.body.classList.remove("cursor-hover");
        }
    });
    
    function updateCursor() {
        dotX += (mouseX - dotX) * 0.25;
        dotY += (mouseY - dotY) * 0.25;
        
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        
        dot.style.left = `${dotX}px`;
        dot.style.top = `${dotY}px`;
        
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
        
        requestAnimationFrame(updateCursor);
    }
    
    updateCursor();
}

// 3. 3D Inertial Card Tilt Physics (Neon Green shadows)
function initCardTilt() {
    function applyTilt(card) {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            
            const tiltX = (yc - y) / 40; 
            const tiltY = (x - xc) / 40;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-2px) scale(1.003)`;
            card.style.boxShadow = `0 6px 16px rgba(0, 0, 0, 0.35), 0 0 10px rgba(0, 255, 136, 0.06)`;
        });
        
        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
            card.style.boxShadow = "";
        });
    }

    document.querySelectorAll(".tilt-card").forEach(applyTilt);
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) {
                    if (node.classList.contains("tilt-card")) {
                        applyTilt(node);
                    }
                    node.querySelectorAll(".tilt-card").forEach(applyTilt);
                }
            });
        });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
}

// 4. Scroll-based Reveal Animations
function initScrollReveal() {
    const sections = document.querySelectorAll('.hero-section, .selector-section, .dashboard-grid, .compare-section, .matrix-section');
    sections.forEach(s => s.classList.add('reveal-on-scroll'));
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    
    sections.forEach(s => observer.observe(s));
}

// 5. Header Scroll Shrink
function initHeaderScroll() {
    const header = document.getElementById('app-header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });
}

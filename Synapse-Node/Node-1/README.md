# 🏥 MediChain DAO
**Own Your Health Data. Decentralized, immutable medical records powered by Cardano and Lace.**

*Built for IndiaCodex'26 — The Cardano Hackathon (Hyderabad)*

---

## ⚠️ The Problem
Today's healthcare system is fragmented. 
- **Data Silos:** Hospitals cannot easily share data, leading to expensive repeated tests.
- **Medical Errors:** 1 in 4 patients face medical errors due to incomplete records (WHO).
- **Zero Patient Agency:** Patients have zero control over who sees their most sensitive data or how long they keep it. 

## 💡 The Solution
**MediChain DAO** transforms medical records from "dead paper" into "live, smart data." We put the patient at the center of the architecture. Records are encrypted and tied to a decentralized identity (Lace Wallet). Doctors must request access, and patients grant **cryptographic, ephemeral consent** verified on the Cardano blockchain.

---

## 🔥 Key Features (Hackathon Deliverables)

### 1. Cryptographic Consent (CIP-8/CIP-30)
No database flips. When a patient approves a doctor, they sign a cryptographic payload via Lace. This creates an immutable, verifiable proof of consent.

### 2. Live Web3 Integrations (MeshJS)
- **Dynamic Affordability:** Real-time ADA balance checks to ensure patients can cover network fees.
- **On-Chain Time-stamping:** Uses `KoiosProvider` to fetch the live Cardano Epoch and Slot for absolute truth in timestamping access requests.
- **Doctor NFT Credential Scanner:** Real-time wallet asset scanning to verify if a doctor holds a valid Medical License NFT before they can request data.

### 3. Masumi AI Diagnostic Agent 🤖 (Masumi Track)
Doctors don't have time to read 50-page PDFs. Once a patient unlocks their record, our integrated AI agent scans the data and generates a 3-point risk analysis (e.g., flagging high-probability allergies).

### 4. Selective Disclosure via ZK-Proofs 🛡️ (Midnight Track)
Why share your whole medical history just to prove you are vaccinated? MediChain allows patients to generate a Zero-Knowledge Proof (ZK-Proof) to verify specific health states without revealing underlying private data.

### 5. Ephemeral "Time-Bombed" Access ⏳
Consent shouldn't be permanent. Patients can grant access for 1 hour, 24 hours, or 7 days. Once the epoch time expires, the doctor's access is mathematically revoked.

---

## 🛠️ Tech Stack
- **Blockchain:** Cardano (Testnet)
- **Wallet Provider:** Lace (CIP-30 compatible)
- **Web3 SDK:** MeshJS (`@meshsdk/react`, `@meshsdk/core`)
- **Frontend:** Next.js 15 (App Router), React, TypeScript
- **Styling:** Tailwind CSS (Brutalist Web3 Design System)
- **Icons:** Lucide React

---

## 🚀 How to Run Locally

### Prerequisites
1. Node.js (v18+)
2. [Lace Wallet Extension](https://www.lace.io/) installed in your browser.
3. Wallet network set to **Pre-prod / Testnet**.
4. Test ADA in your wallet (via the [Cardano Faucet](https://docs.cardano.org/cardano-testnet/tools/faucet/)).

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/medichain-dao.git](https://github.com/yourusername/medichain-dao.git)
   cd medichain-dao
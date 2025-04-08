
# 🍽️ RestoraTech

**RestoraTech** és una plataforma integral per a la gestió de restaurants, desenvolupada com a projecte final del Cicle Formatiu de Grau Superior en Desenvolupament d'Aplicacions Web (DAW).

L’objectiu és facilitar i optimitzar el funcionament intern del restaurant (reserves, comandes, inventari, caixa) mitjançant una aplicació moderna, responsiva i escalable, amb vistes diferenciades per a cada rol del personal.

---

## 🚀 Funcionalitats principals

### 🧑‍💼 Administrador
- Gestió de carta (CRUD de productes i receptes amb escandall)
- Informe de caixa diària amb gràfiques
- Control automàtic d'inventari
- Panell de gestió d'usuaris i rols
- Anàlisi DAFO setmanal automàtic

### 🧑‍🍳 Cuina
- Llistat de comandes en temps real
- Canvi d'estat a “preparada”
- Historial de comandes

### 🧑‍🔧 Cambrer
- Visualització i gestió de taules
- Confirmació d'entrega de comandes
- Creació de comandes per taula (manual o via QR)

### 👤 Client
- Registre amb verificació per email
- Reserva online amb confirmació
- Lectura de carta amb codi QR
- Comanda directa des del mòbil

---

## 🛠️ Tecnologies utilitzades

- **Frontend**: [Next.js](https://nextjs.org/), TailwindCSS, React Context
- **Backend**: [Strapi](https://strapi.io/) + MySQL
- **Autenticació**: JWT amb verificació per correu
- **Temps real**: Socket.io (opcional)
- **Gràfiques**: Chart.js
- **Desplegament**: Vercel + Railway o Render

---

## ⚙️ Instal·lació

### 1. Backend (Strapi)
```bash
cd backend
npm install
cp .env.example .env # i configura connexió amb MySQL
npm run develop
```

### 2. Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Enllaços del projecte

- 🔗 **Web desplegada (Vercel)**: https://proyecto-2-daw.vercel.app/
- 🗂️ **Codi font (repositori GitHub)**: [Debau123/Proyecto_2DAW](https://github.com/Debau123/Proyecto_2DAW)
- 📋 **Projecte organitzat (GitHub Projects)**: [Tauler de treball](https://github.com/users/Debau123/projects/2)

---

## 📁 Estructura del projecte

```
├── frontend/
│   └── (Next.js amb pàgines per rol)
├── backend/
│   └── (Strapi amb col·leccions definides)
├── README.md
└── docs/
    └── (memòria, DAFO, escandalls, annexos)
```

---

## 🧑‍🎓 Autor

**Iñaki Borrego Bau**  
Cicle Formatiu de Grau Superior en DAW  
[GitHub](https://github.com/Debau123)

---

## 🗓️ Projecte desenvolupat entre abril i juny de 2025.

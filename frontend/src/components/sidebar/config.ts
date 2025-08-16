import {
  IconDashboard,
  IconInnerShadowTop,
  IconListDetails,
} from "@tabler/icons-react"


const navMain =  [
    {
      title: "Liste des lauréats",
      url: "/students",
      icon: IconDashboard,
    },
    {
      title: "Liste des diplomes",
      url: "/diplomas",
      icon: IconListDetails,
    },
  
  ]



const subItems = [   {
      title:"En attente",
      url: `/diplomas/status/${encodeURIComponent("en attente")}`,
      icon: IconInnerShadowTop,
    },
    {
      title:"Envoyé à la présidence",
      url: `/diplomas/status/${encodeURIComponent("envoyé à la présidence")}`,
      icon: IconInnerShadowTop,
    },
    {
      title:"Arrivé à la présidence",
      url: `/diplomas/status/${encodeURIComponent("arrivé à la présidence")}`,
      icon: IconInnerShadowTop,
    },
    {
      title:"Envoyé à l'établissement",
      url: `/diplomas/status/${encodeURIComponent("envoyé à l'établissement")}`,
      icon: IconInnerShadowTop,
    },
    {
      title:"Arrivé à l'établissement",
      url: `/diplomas/status/${encodeURIComponent("arrivé à l'établissement")}`,
      icon: IconInnerShadowTop,
    },
    {
      title:"Correction requise",
      url: `/diplomas/status/${encodeURIComponent("correction requise")}`,
      icon: IconInnerShadowTop,
    },
    {
      title:"Renvoyé après correction",
      url: `/diplomas/status/${encodeURIComponent("renvoyé après correction")}`,
      icon: IconInnerShadowTop,
    },
    {
      title:"Signé par le président",
      url: `/diplomas/status/${encodeURIComponent("signé par le président")}`,
      icon: IconInnerShadowTop,
    },
    {
      title:"Prêt",
      url: `/diplomas/status/${encodeURIComponent("prêt")}`,
      icon: IconInnerShadowTop,
    },
    {
      title:"Délivré",
      url: `/diplomas/status/${encodeURIComponent("délivré")}`,
      icon: IconInnerShadowTop,
    },]
 
export { navMain, subItems }
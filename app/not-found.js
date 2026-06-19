import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-amber-500">404</h1>
        <h2 className="text-2xl font-semibold text-white">Página no encontrada</h2>
        <p className="text-slate-400 max-w-md mx-auto">
          La página que buscas no existe o ha sido movida. Te invitamos a conocer más sobre nosotros.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-full font-bold hover:from-amber-500 hover:to-amber-400 transition-all"
          >
            Ir al Inicio
          </Link>
          <Link
            href="/sobre-nosotros"
            className="px-6 py-3 border border-slate-700 text-slate-300 rounded-full font-bold hover:border-amber-500 hover:text-amber-400 transition-all"
          >
            Sobre Nosotros
          </Link>
        </div>
      </div>
    </div>
  )
}

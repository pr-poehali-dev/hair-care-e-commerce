import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const NAV = [
  { id: 'home', label: 'Главная' },
  { id: 'catalog', label: 'Каталог' },
  { id: 'about', label: 'О бренде' },
  { id: 'delivery', label: 'Доставка' },
  { id: 'contacts', label: 'Контакты' },
];

const PRODUCTS = [
  {
    id: 1,
    name: 'Гель для душа',
    tag: 'Древесный аромат',
    price: '790 ₽',
    color: '#FF2D78',
    img: 'https://cdn.poehali.dev/projects/a7665cf7-da94-42fb-866d-46edd863a964/files/af0ffa0a-223a-4d3d-829d-5a7dc8990f7b.jpg',
    rating: 4.9,
    reviews: 214,
  },
  {
    id: 2,
    name: 'Шампунь освежающий',
    tag: 'Аромат эвкалипта',
    price: '890 ₽',
    color: '#FF5A1F',
    img: 'https://cdn.poehali.dev/projects/a7665cf7-da94-42fb-866d-46edd863a964/files/561433f4-f408-45a7-8f96-66054bb3609b.jpg',
    rating: 4.8,
    reviews: 168,
  },
  {
    id: 3,
    name: 'Шампунь контроль объёма',
    tag: 'Аромат одеколона · 500ml',
    price: '990 ₽',
    color: '#E11D2A',
    img: 'https://cdn.poehali.dev/projects/a7665cf7-da94-42fb-866d-46edd863a964/files/fdbc5ca2-c70b-4538-977b-3dbbbefc86df.jpg',
    rating: 5.0,
    reviews: 302,
  },
];

const REVIEWS = [
  { name: 'Артём К.', rating: 5, text: 'Запах бомба, держится весь день. Упаковка — вообще топ, стоит на полке как арт-объект.', product: 'Шампунь контроль объёма' },
  { name: 'Данил Р.', rating: 5, text: 'Реально контролирует жирность, волосы дольше свежие. Взял сразу три бочки.', product: 'Гель для душа' },
  { name: 'Максим В.', rating: 4, text: 'Эвкалипт освежает по утрам не хуже кофе. Единственное — быстро заканчивается, потому что нравится.', product: 'Шампунь освежающий' },
];

function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon
          key={i}
          name="Star"
          size={size}
          className={i <= Math.round(value) ? 'text-brand-orange fill-brand-orange' : 'text-muted-foreground/40'}
        />
      ))}
    </div>
  );
}

const Logo = ({ className = '' }: { className?: string }) => (
  <span className={`font-display font-bold tracking-tight ${className}`}>
    MARTIN<span className="text-brand-pink">Э</span>T
  </span>
);

const Index = () => {
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (id: string) => {
    setActive(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="container flex items-center justify-between h-16">
          <button onClick={() => go('home')}>
            <Logo className="text-2xl" />
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className={`font-display uppercase text-sm tracking-wider transition-colors ${
                  active === n.id ? 'text-brand-pink' : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>
          <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={26} />
          </button>
        </div>
        {menuOpen && (
          <nav className="md:hidden border-t border-border bg-background animate-fade-in">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className="block w-full text-left px-6 py-4 font-display uppercase tracking-wider border-b border-border/50"
              >
                {n.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 grid-texture opacity-60" />
        <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-brand-pink/30 blur-[140px]" />
        <div className="absolute bottom-0 -left-24 w-[380px] h-[380px] rounded-full bg-brand-orange/20 blur-[130px]" />
        <div className="container relative py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-brand-pink/50 rounded-full text-brand-pink text-xs font-display uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-brand-pink animate-pulse" /> Personal Care Series
              </div>
              <h1 className="font-display font-bold uppercase leading-[0.92] text-5xl sm:text-6xl md:text-7xl">
                Твой стиль,
                <br />
                <span className="text-brand-pink">твоя</span> эпоха.
              </h1>
              <p className="mt-6 max-w-md text-muted-foreground text-lg">
                Брутальная мужская косметика в упаковке-бочке. Уход, который выглядит и работает как надо.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  onClick={() => go('catalog')}
                  className="bg-brand-pink hover:bg-brand-pink/90 text-white font-display uppercase tracking-wider rounded-none h-12 px-8"
                >
                  Смотреть каталог
                </Button>
                <Button
                  onClick={() => go('about')}
                  variant="outline"
                  className="border-foreground/30 hover:bg-foreground/5 font-display uppercase tracking-wider rounded-none h-12 px-8"
                >
                  О бренде
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in" style={{ animationDelay: '0.15s' }}>
              <div className="absolute inset-6 bg-brand-pink/20 blur-2xl rounded-full" />
              <img
                src={PRODUCTS[0].img}
                alt="MARTINET"
                className="relative w-full max-w-md mx-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
        {/* marquee */}
        <div className="border-y border-border bg-brand-pink text-black overflow-hidden py-3">
          <div className="flex whitespace-nowrap animate-marquee font-display uppercase font-bold text-lg tracking-widest">
            {Array.from({ length: 2 }).map((_, k) => (
              <span key={k} className="flex">
                {['Do it well', 'Burning youth', 'Cool', 'Matching suit', '發財'].map((t) => (
                  <span key={t} className="mx-6 flex items-center gap-6">
                    {t} <span className="text-black/40">✦</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="container py-20 md:py-28">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-display uppercase tracking-widest text-brand-orange text-sm mb-2">Каталог</p>
            <h2 className="font-display font-bold uppercase text-4xl md:text-5xl">Вся линейка</h2>
          </div>
          <span className="hidden md:block text-8xl font-display font-bold text-stroke select-none leading-none">M</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((p) => (
            <article
              key={p.id}
              className="group relative border border-border bg-card overflow-hidden transition-all hover:border-brand-pink"
            >
              <div className="relative aspect-square overflow-hidden">
                <div
                  className="absolute inset-0 opacity-25 blur-3xl transition-opacity group-hover:opacity-40"
                  style={{ backgroundColor: p.color }}
                />
                <img
                  src={p.img}
                  alt={p.name}
                  className="relative w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <Stars value={p.rating} />
                  <span className="text-xs text-muted-foreground">{p.rating} · {p.reviews} отзывов</span>
                </div>
                <h3 className="font-display uppercase font-semibold text-xl">{p.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{p.tag}</p>
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-2xl">{p.price}</span>
                  <Button
                    size="sm"
                    className="bg-foreground text-background hover:bg-brand-pink hover:text-white rounded-none font-display uppercase tracking-wider"
                  >
                    <Icon name="ShoppingBag" size={16} className="mr-1" /> В корзину
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="border-y border-border bg-card/40">
        <div className="container py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="font-display uppercase tracking-widest text-brand-pink text-sm mb-2">Отзывы</p>
              <h2 className="font-display font-bold uppercase text-4xl md:text-5xl">Что говорят парни</h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-display font-bold text-5xl text-brand-orange">4.9</span>
              <div>
                <Stars value={5} size={20} />
                <p className="text-sm text-muted-foreground mt-1">на основе 684 отзывов</p>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="border border-border bg-background p-6 flex flex-col">
                <Stars value={r.rating} />
                <p className="mt-4 flex-1 text-foreground/90">«{r.text}»</p>
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="font-display uppercase font-semibold">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.product}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button
              variant="outline"
              className="border-foreground/30 hover:bg-foreground/5 rounded-none font-display uppercase tracking-wider h-12 px-8"
            >
              Оставить отзыв
            </Button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="container py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[10rem] leading-none font-display font-bold text-stroke select-none">Э</span>
          </div>
          <div>
            <p className="font-display uppercase tracking-widest text-brand-orange text-sm mb-2">О бренде</p>
            <h2 className="font-display font-bold uppercase text-4xl md:text-5xl mb-6">Не просто уход. Характер.</h2>
            <p className="text-muted-foreground text-lg mb-4">
              MARTINET — это про смелость и стиль. Мы делаем мужскую косметику, которая работает без компромиссов
              и выглядит как заявление.
            </p>
            <p className="text-muted-foreground text-lg mb-8">
              Фирменная упаковка-бочка, кислотные цвета и составы, проверенные тысячами покупателей.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { n: '15+', l: 'продуктов' },
                { n: '50k+', l: 'заказов' },
                { n: '4.9', l: 'рейтинг' },
              ].map((s) => (
                <div key={s.l} className="border border-border p-4 text-center">
                  <p className="font-display font-bold text-3xl text-brand-pink">{s.n}</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="border-y border-border bg-card/40">
        <div className="container py-20 md:py-28">
          <p className="font-display uppercase tracking-widest text-brand-pink text-sm mb-2">Доставка</p>
          <h2 className="font-display font-bold uppercase text-4xl md:text-5xl mb-12">Быстро и без нервов</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: 'Truck', t: 'Курьером', d: 'По Москве и СПб — от 1 дня. Доставим прямо до двери.' },
              { icon: 'Package', t: 'ПВЗ и постаматы', d: 'СДЭК, Boxberry, Ozon по всей России от 2 дней.' },
              { icon: 'CreditCard', t: 'Оплата', d: 'Картой онлайн или при получении. Бесплатно от 3000 ₽.' },
            ].map((c) => (
              <div key={c.t} className="border border-border bg-background p-8">
                <div className="w-12 h-12 flex items-center justify-center bg-brand-pink text-white mb-5">
                  <Icon name={c.icon} size={24} />
                </div>
                <h3 className="font-display uppercase font-semibold text-xl mb-2">{c.t}</h3>
                <p className="text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="container py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="font-display uppercase tracking-widest text-brand-orange text-sm mb-2">Контакты</p>
            <h2 className="font-display font-bold uppercase text-4xl md:text-5xl mb-8">Напиши нам</h2>
            <div className="space-y-5">
              {[
                { icon: 'Mail', t: 'hello@martinet.ru' },
                { icon: 'Phone', t: '+7 (495) 000-00-00' },
                { icon: 'MapPin', t: 'Москва, ул. Примерная, 1' },
                { icon: 'Send', t: '@martinet_shop' },
              ].map((c) => (
                <div key={c.t} className="flex items-center gap-4">
                  <div className="w-11 h-11 flex items-center justify-center border border-border">
                    <Icon name={c.icon} size={20} className="text-brand-pink" />
                  </div>
                  <span className="text-lg">{c.t}</span>
                </div>
              ))}
            </div>
          </div>
          <form className="border border-border bg-card p-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              placeholder="Имя"
              className="w-full bg-background border border-border h-12 px-4 focus:border-brand-pink outline-none"
            />
            <input
              placeholder="Email или телефон"
              className="w-full bg-background border border-border h-12 px-4 focus:border-brand-pink outline-none"
            />
            <textarea
              placeholder="Сообщение"
              rows={4}
              className="w-full bg-background border border-border p-4 focus:border-brand-pink outline-none resize-none"
            />
            <Button className="w-full bg-brand-pink hover:bg-brand-pink/90 text-white rounded-none h-12 font-display uppercase tracking-wider">
              Отправить
            </Button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo className="text-2xl" />
          <p className="text-sm text-muted-foreground uppercase tracking-wider font-display">
            © 2024 Martinet — Твой стиль, твоя эпоха
          </p>
          <div className="flex gap-4">
            {['Instagram', 'Send', 'Youtube'].map((s) => (
              <button key={s} className="w-10 h-10 flex items-center justify-center border border-border hover:border-brand-pink hover:text-brand-pink transition-colors">
                <Icon name={s} size={18} />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

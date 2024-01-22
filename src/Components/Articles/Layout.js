import { MDXProvider } from '@mdx-js/react';
import { components } from './MdxComponents';

const Layout = ({ children }) => {
  return (
    <MDXProvider components={components}>
      <div>
        <header>
          <h1>My MDX Next.js Blog</h1>
        </header>
        <main>{children}</main>
      </div>
    </MDXProvider>
  );
};

export default Layout;



{/* <img src='https://azurequarks.blob.core.windows.net/vehiculos/camioneta-10000-dolares-toyota.jpg' alt='Asi es la camioneta de 10000 dolares de Toyota' style="width:100%; object-fit:contain" /> <br/><br/>
  <p style="line-height: 1.8">Este vehículo, con un precio inicial estimado de $10,000, busca llenar un espacio de bajo costo debajo del famoso Hilux. Vamos a descubrir qué hace especial a este pickup y por qué es tan económico. 🌐🚗✨</p>

  <br/><br/>

  <h2 >El Contexto del Mercado</h2><br/>
  <p style="line-height: 1.8;">Para empezar debemos comprender el contexto del mercado, en muchos países, el Toyota Hilux es una presencia conocida, un vehículo robusto y básico que se ha convertido en un estándar en diversos lugares del mundo.  </p><br/><br/>
  <p style="line-height: 1.8;">Sin embargo, el Hilux empezaba a volverse demasiado sofisticado para algunos mercados con un presupuesto más ajustado. </p><br/><br/>
  <p style="line-height: 1.8;"> Ahí es donde entra en juego el <b>IMV 0</b>, un pickup no pretencioso diseñado para ser accesible en todos los sentidos.</p> 

  <br/><br/>

  <h2 >Como es su diseño y características?</h2><br/>
  <p style="line-height: 1.8;">Para esto en Toyota han eliminado cualquier elemento que no sea esencial para reducir costos, desde ventanas planas hasta un área de carga sin lados en la versión estándar. Un diseño simple y funcional.  </p><br/><br/>
  <p style="line-height: 1.8;">Pero la versatilidad está en el corazón de este pickup, con opciones como un modelo de carga lateral.</p><br/>
  <p style="line-height: 1.8;">Algo que realmente destaca es la invitación a modificadores de todo el mundo para mejorar el chasis y la cabina según sus necesidades. </p>
  <br/><br/>

  <h2 >Detalles Técnicos</h2><br/>
  <p style="line-height: 1.8;">En el departamento técnico, el IMV 0 ha tomado decisiones interesantes. Como la ausencia de <b>bolsas de aire (airbags)</b>, (aunque también estarán disponibles como opción o serán estándar en algunos mercados).<br/> Sin reposabrazos, solo bolsillos en las puertas que también sirven como manijas, control de ventanas manuales, bastante plástico y caucho en el interior, en fin, todo está pensado para ser esencial. </p><br/><br/>
  <p style="line-height: 1.8;"> En cuanto a la suspensión, es una la suspension heredada del Hilux, que ofrece posibilidades de actualización para quienes buscan aumentar el GVWR. </p><br/><br/>
  <p style="line-height: 1.8;">En cuanto a su motor. No se han revelado las especificaciones exactas del tren motriz, pero suponemos que nuestro ejemplo estaba equipado con el motor de gasolina básico de cuatro cilindros, <b>2.0 litros y 139 hp del Hilux</b> y una transmisión manual de cinco velocidades. <br/>(Suponemos que el diésel será la unidad Hilux de 2.4 litros y 150 hp, pero es probable que se ofrezcan varios motores). </p>
  <br/><br/>
<iframe width="560" height="315" src="https://www.youtube.com/embed/aNPvjFGTa8s?si=Pw9pU_7GCW8SHGdp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  <h2 >Su conduccion</h2><br/>
  <p style="line-height: 1.8;"> Pero, ¿cómo se siente al conducirlo? La gente de Motortrend, tuvieron la oportunidad de probar una versión y dijeron, que a pesar de contar con bolsas de aire y ABS, este pickup simplificado se siente más ligero de lo que sugiere su tamaño, acelerando de manera más rápida de lo esperado.</p><br/><br/>
  <p style="line-height: 1.8;">  Su diseño básico y sin lujos ofrece una experiencia refrescante en un mundo donde los vehículos nuevos tienden a tener precios mucho más altos.</p><br/><br/>
  <p style="line-height: 1.8;">  Al conducir esta pickup, uno se da cuenta instantáneamente de cómo permitirá a personas de otros rincones del mundo realizar el duro trabajo necesario para ganarse la vida, construir una comunidad, ayudar a otros, etc. En ese sentido, es un tipo muy diferente de "vehículo de estilo de vida" del que estamos acostumbrados. </p>
  <br/><br/>

  <h2 >Adaptabilidad y Plan a Largo Plazo</h2><br/>
  <p style="line-height: 1.8;">El IMV 0 no es solo un vehículo, es una plataforma para futuras adaptaciones. Toyota planea minimizar las ganancias con la venta del pickup básico y obtener beneficios de las mejoras y personalizaciones adicionales. </p><br/><br/>
  <p style="line-height: 1.8;"> Desde un vehículo de trabajo robusto hasta un camión de apoyo en carreras, las posibilidades son diversas.</p>
  <br/><br/>

  <h2 >Cuando podremos comprarlo?</h2><br/>
  <p style="line-height: 1.8;">Si bien el nombre "IMV 0" puede cambiar antes de la producción, se espera que llegue a los mercados en 2025 con un precio inicial de alrededor de $10,000. <br/> Sin embargo, para mercados más regulados, donde no se tolera la ausencia de bolsas de aire y ABS, el precio podría estar $5,000 dólares menos que el Hilux convencional. </p><br/><br/>
  <p style="line-height: 1.8;"> Desde un vehículo de trabajo robusto hasta un camión de apoyo en carreras, las posibilidades son diversas.</p>
  <br/><br/> */}
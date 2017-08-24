import test from 'ava';
import lib from './src';
import pcss from 'postcss';
import globalNested from './src';
import nested from 'postcss-nested';

const fixtures = {
  basic: {
    css: `
      .bar {
        .foo {}
      }
    `,
    ref: `.bar .foo {}`,
  },
  simple: {
    css: `
      :global {
        .foo {}
      }
    `,
    ref: `:global(.foo) {}`,
  },
  complex: {
    css: `
      :global {
        :global(.foo) {}
        :global .baz {}
        .qux {
          .sux {}
          :global .wat {}
        }
      }
    `,
    ref: `
      :global(:global(.foo)) {}
        :global(:global .baz) {}
        :global(.qux .sux) {}
        :global(.qux :global .wat) {}
    `,
  },
};

test('basic', async t => {
  const result = await pcss([nested, globalNested]).process(fixtures.basic.css);
  t.is(result.css.trim(), fixtures.basic.ref);
});

test('simple', async t => {
  const result = await pcss([nested, globalNested]).process(fixtures.simple.css);
  t.is(result.css.trim(), fixtures.simple.ref);
});

test('complex', async t => {
  const result = await pcss([nested, globalNested]).process(fixtures.complex.css);
  t.is(result.css, fixtures.complex.ref);
});

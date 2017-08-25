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
  nested: {
    css: `
      .bar {
        :global {
          .foo {}
        }
      }
    `,
    ref: `.bar :global(.foo) {}`,
  },
  multiselector: {
    css: `
      :global {
        .foo, .bar {}
      }
    `,
    ref: `:global(.foo), :global(.bar) {}`,
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

test('nested', async t => {
  const result = await pcss([nested, globalNested]).process(fixtures.nested.css);
  t.is(result.css.trim(), fixtures.nested.ref);
});

test('multiselector', async t => {
  const result = await pcss([nested, globalNested]).process(fixtures.multiselector.css);
  t.is(result.css.trim(), fixtures.multiselector.ref);
});

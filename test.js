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
  multiple: {
    css: `
      :global {
        .foo, .bar {}
      }
    `,
    ref: `:global(.foo), :global(.bar) {}`,
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
  multipleComplex: {
    css: `
      :global {
        :global(.foo) {}
        :global .foo, .baz {}
        .qux {
          .sux, .works {}
          :global .wat, :global .works {}
        }
      }
    `,
    ref: `
      :global(:global(.foo)) {}
        :global(:global .foo), :global(.baz) {}
        :global(.qux .sux), :global(.qux .works) {}
        :global(.qux :global .wat), :global(.qux :global .works) {}
    `,
  },
  multipleComplexLocal: {
    css: `
      :global {
        :global(.foo) {}
        :local .foo, .baz {}
        .qux {
          .sux, .works {}
          :global .wat, :local .works {}
        }
      }
    `,
    ref: `
      :global(:global(.foo)) {}
        :global(:local .foo), :global(.baz) {}
        :global(.qux .sux), :global(.qux .works) {}
        :global(.qux :global .wat), :global(.qux :local .works) {}
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

Object.keys(fixtures)
  .map(fixture => {
    test(fixture, async t => {
      const result = await pcss([nested, globalNested]).process(fixtures[fixture].css);
      t.is(result.css.trim(), fixtures[fixture].ref.trim());
    });
  });

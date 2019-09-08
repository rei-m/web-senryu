import makeStyles from '@material-ui/core/styles/makeStyles';
import { Styles, WithStylesOptions } from '@material-ui/styles/withStyles';
import { ThemeInterface } from './theme';

const appMakeStyles = <P extends {} = {}>(
  styles: Styles<ThemeInterface, P, string>,
  options?: Omit<WithStylesOptions<ThemeInterface>, 'withTheme'>
) => {
  return makeStyles<ThemeInterface, P>(styles, options);
};

export default appMakeStyles;

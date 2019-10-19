import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import CancelIcon from '@material-ui/icons/Cancel';
import makeStyles from '@src/styles/makeStyles';
import Heading from '@src/components/atoms/Heading';
import JpDate from '@src/components/atoms/JpDate';
import ConfirmTextField from '@src/components/molecules/ConfirmTextField';
import DeleteButton from '@src/components/molecules/DeleteButton';
import AlertDialog from '@src/components/molecules/AlertDialog';
import SenryuFuda from '@src/components/organisms/SenryuFuda';
import { Senryu, UserId, SenryuId } from '@src/domain';
import { ROUTING } from '@src/constants/routing';
import { useBool } from '@src/hooks/useBool';

export type Props = {
  open: boolean;
  senryu: Senryu | null;
  canDelete?: boolean;
  onClickUserName: (userId: UserId) => void;
  onClickDelete: (senryuId: SenryuId) => void;
  onClose: () => void;
};

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4),
    boxShadow: theme.shadows[2],
    maxHeight: '80%',
    overflowY: 'scroll',
    '&:focus': {
      outline: 'none',
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 296,
    },
  },
  fuda: {
    boxShadow: theme.elevation(1),
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: theme.spacing(0.5),
  },
  datetime: {
    fontSize: theme.fontSize.sss,
    textAlign: 'right',
    marginTop: theme.spacing(2),
  },
  comment: {
    marginTop: theme.spacing(2),
  },
  cancelIcon: {
    position: 'absolute',
    top: 4,
    right: 4,
    cursor: 'pointer',
    color: theme.palette.text.secondary,
  },
  deleteButtonContainer: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
}));

const SenryuModal = ({
  open,
  senryu,
  canDelete = false,
  onClickUserName,
  onClickDelete,
  onClose,
}: Props) => {
  const [isConfirmDialogOpen, openConfirmDialog, closeConfirmDialog] = useBool(
    false
  );

  const handleClickUserName = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (senryu && senryu.userId) {
      onClickUserName(senryu.userId);
    }
  };

  const handleClickConfrimDelete = () => {
    closeConfirmDialog();
    if (senryu) {
      onClickDelete(senryu.id);
    }
  };

  const classes = useStyles();

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 200,
      }}
    >
      <Fade in={open}>
        <Paper className={classes.paper}>
          {senryu && (
            <article>
              <Heading level={6} visualLevel={3}>
                {senryu.userId ? (
                  <a
                    href={ROUTING.usersShow.replace(`:id`, senryu.userId)}
                    onClick={handleClickUserName}
                  >{`${senryu.ryugou}の川柳`}</a>
                ) : (
                  `${senryu.ryugou}の川柳`
                )}
              </Heading>
              <div className={classes.datetime}>
                <JpDate date={senryu.createdAt} />
              </div>
              <SenryuFuda senryu={senryu} size={`m`} className={classes.fuda} />
              {senryu.comment && (
                <ConfirmTextField
                  label={`一言`}
                  value={senryu.comment}
                  className={classes.comment}
                />
              )}
              {canDelete && (
                <div className={classes.deleteButtonContainer}>
                  <DeleteButton
                    iconSize={`small`}
                    size={`small`}
                    color={`secondary`}
                    onClick={openConfirmDialog}
                  >
                    削除する
                  </DeleteButton>
                </div>
              )}
            </article>
          )}
          <CancelIcon className={classes.cancelIcon} onClick={onClose} />
          <AlertDialog
            open={isConfirmDialogOpen}
            dialogTitle={`削除確認`}
            contentText={`この川柳を削除します`}
            positiveButtonLabel={`削除する`}
            negativeButtonLabel={`戻る`}
            onClickPositive={handleClickConfrimDelete}
            onClose={closeConfirmDialog}
          />
        </Paper>
      </Fade>
    </Modal>
  );
};

export default SenryuModal;
